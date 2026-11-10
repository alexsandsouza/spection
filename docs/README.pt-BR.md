# SPECTION - Guia em português

SPECTION é um framework aberto de Engenharia de Software Guiada por IA. Seu objetivo é ajudar a desenvolver aplicações úteis, seguras, eficientes, éticas e responsáveis, com especificações versionadas e supervisão humana.

## Como funciona

Ideia → Product Brief → requisitos (PRD) → arquitetura (HLD/LLD/ADR) → especificação da funcionalidade → plano e tarefas → implementação → testes e revisão → entrega e evolução. O processo é iterativo: mudanças de requisito voltam à especificação.

## Como começar

Clone o repositório, instale Python 3.10+ e execute:

```bash
git clone https://github.com/alexsandsouza/spection.git
cd spection
python kit/spection.py init minha-app
python kit/spection.py feature minha-app cadastro
python kit/spection.py doctor minha-app
python kit/spection.py check minha-app
```

Preencha o Product Brief e os requisitos. Abra o projeto no editor e informe ao agente os documentos relevantes e AGENTS.md. Solicite primeiro um plano, depois código em pequenas mudanças e testes reais. Revise a saída, registre evidências e autorize a publicação explicitamente.

## Por que acelera?

Documentos e skills reduzem a repetição de contexto; critérios de aceitação reduzem ambiguidades; tarefas pequenas facilitam revisão; automação ajuda a detectar problemas. Meça tempo de entrega, retrabalho, defeitos e custo antes de afirmar ganhos.

## Segurança e responsabilidade

Não envie segredos ou dados pessoais para modelos sem autorização e controles adequados. Revise permissões, riscos, dependências, acessibilidade, privacidade e impactos. Se a aplicação usa IA, avalie qualidade, latência, custo, prompt injection e limites de ferramentas. O framework não garante conformidade nem substitui avaliação especializada.

## Documentação

- [Funcionamento](framework-guide.md)
- [Guia prático com exemplo](developer-guide.md)
- [Desenvolvimento responsável](responsible-development.md)
- [Arquitetura de IA](../kit/docs/architecture.md)
- [Direitos autorais](../COPYRIGHT.md)
- [Licença MIT](../LICENSE)
