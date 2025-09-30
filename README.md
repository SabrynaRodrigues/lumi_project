# Projeto: Sistema de Análise Automatizada de Currículos com Inteligência Artificial

## Objetivo Principal

Reduzir o tempo médio de análise de currículos (lead time) no processo de triagem inicial.

## Funcionalidades do Sistema

### 1. Cadastro de Cargos e Competências Técnicas
- Interface para registro de novos cargos (exemplo: "Desenvolvedor Front-end")
- Definição de competências técnicas obrigatórias (exemplo: JavaScript, React, CSS)
- Catálogo parametrizável de requisitos técnicos por posição

### 2. Encerramento de Processos Seletivos
- Mecanismo para finalização de processos seletivos específicos
- Bloqueio automático de novas análises para cargos encerrados
- Arquivo histórico de processos concluídos

### 3. Definição de Limiar Mínimo de Adequação
- Configuração de percentual mínimo de correspondência (exemplo: 70%)
- Estabelecimento de critérios objetivos para aprovação na triagem inicial
- Parâmetro ajustável conforme complexidade do cargo

### 4. Sistema de Comunicação por Correio Eletrônico (Funcionalidade Adicional)
- Módulo opcional para envio automatizado de feedback
- Personalização de templates de mensagens
- Controle de ativação/desativação do serviço

### 5. Apresentação de Métricas de Adequação
- Exibição do percentual de correspondência para cada currículo analisado
- Métrica quantitativa baseada na relação entre competências requeridas e identificadas
- Visualização clara do índice de adequação técnico-profissional

## Arquitetura de Interface

### 1. Tela de Autenticação (Login/Cadastro)

**Campos Obrigatórios:**
- Endereço de correio eletrônico
- Senha de acesso

**Funcionalidades Secundárias:**
- Criação de nova conta de usuário
- Mecanismo de recuperação de credenciais (funcionalidade adicional)

### 2. Dashboard Principal

**Módulos de Navegação:**
- **Histórico de Cargos Registrados**: Apresentação consolidada de posições anteriores com indicadores de desempenho (exemplo: volume de candidatos, taxa de aprovação)
- **Criação de Novo Cargo**: Interface para inicialização de cadastro de nova posição

### 3. Painel de Detalhamento do Cargo

**Métricas do Processo Seletivo:**
- Quantitativo total de currículos recebidos
- Número de candidatos que atingiram o limiar mínimo estabelecido
- Relação discriminada entre aprovados e reprovados com respectivos percentuais

**Listagem de Currículos:**
- Apresentação individualizada de cada candidatura contendo:
  - Endereço de correio eletrônico do candidato
  - Percentual calculado de adequação técnica
 
## Protótipo das páginas:
![Minha Foto](./images/minha-foto.jpg)

  - Status de aprovação/reprovação baseado no limiar definido

