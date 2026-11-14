import importlib.util
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

PATH = Path(__file__).resolve().parents[1] / "integrations/freeclaw/bridge.py"
spec = importlib.util.spec_from_file_location("freeclaw_bridge", PATH)
bridge = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bridge)

class BridgeTests(unittest.TestCase):
    def make_project(self, directory, value="# Approved specification\nRF-001"):
        project = Path(directory)
        for filename in bridge.FILES:
            p = project / filename
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text(value, encoding="utf-8")
        return project

    def test_collect_and_dry_run(self):
        with tempfile.TemporaryDirectory() as directory:
            project = self.make_project(directory)
            self.assertIn("RF-001", bridge.collect(project))
            self.assertEqual(bridge.main([str(project)]), 0)

    def test_missing_document(self):
        with tempfile.TemporaryDirectory() as directory:
            self.assertRaises(ValueError, bridge.collect, Path(directory))

    def test_secret_block(self):
        with tempfile.TemporaryDirectory() as directory:
            project = self.make_project(directory, "sk-" + "a"*30)
            self.assertRaises(ValueError, bridge.collect, project)

    def test_endpoint_security(self):
        bridge.validate_endpoint("https://example.test/v1/chat/completions")
        bridge.validate_endpoint("http://127.0.0.1:8080/v1/chat/completions")
        for value in ["http://example.test/v1/chat/completions", "file:///etc/passwd", "https://user:pass@example.test/api"]:
            self.assertRaises(ValueError, bridge.validate_endpoint, value)

    def test_no_network_without_send(self):
        with tempfile.TemporaryDirectory() as directory:
            project = self.make_project(directory)
            with patch.object(bridge.urllib.request, "urlopen") as send:
                self.assertEqual(bridge.main([str(project)]), 0)
                send.assert_not_called()

    def test_send_requires_configuration(self):
        with tempfile.TemporaryDirectory() as directory:
            project = self.make_project(directory)
            with patch.dict("os.environ", {}, clear=True):
                self.assertEqual(bridge.main([str(project), "--send"]), 1)

if __name__ == "__main__":
    unittest.main()
