"""Local tests for the offline SPECTION Kit CLI."""
import importlib.util
import tempfile
import unittest
from pathlib import Path

MODULE = Path(__file__).resolve().parents[1] / "spection.py"
spec = importlib.util.spec_from_file_location("spection", MODULE)
spection = importlib.util.module_from_spec(spec)
spec.loader.exec_module(spection)


class KitTests(unittest.TestCase):
    def test_init_and_doctor_and_check(self):
        with tempfile.TemporaryDirectory() as tmp:
            project = spection.init(Path(tmp), "example-app")
            self.assertEqual(spection.doctor(project), 0)
            self.assertEqual(spection.check(project), 0)
            self.assertTrue((project / "docs" / "prd.md").exists())

    def test_feature_and_no_overwrite(self):
        with tempfile.TemporaryDirectory() as tmp:
            project = spection.init(Path(tmp), "example-app")
            target = spection.feature(project, "account-login")
            self.assertTrue((target / "feature-spec.md").exists())
            with self.assertRaises(FileExistsError):
                spection.feature(project, "account-login")
            with self.assertRaises(FileExistsError):
                spection.init(Path(tmp), "example-app")

    def test_reject_unsafe_names(self):
        for name in ("../bad", "/absolute", "bad/path", "Bad", "bad..name", "-bad"):
            with self.subTest(name=name), self.assertRaises(ValueError):
                spection.validate_name(name)

    def test_missing_file_detected(self):
        with tempfile.TemporaryDirectory() as tmp:
            project = spection.init(Path(tmp), "example-app")
            (project / "docs" / "prd.md").unlink()
            self.assertEqual(spection.doctor(project), 1)
            self.assertEqual(spection.check(project), 1)


if __name__ == "__main__":
    unittest.main()
