# Configuração da Tabela Case Studies no Supabase

Este documento explica como configurar a tabela `case_studies` no Supabase para a funcionalidade de Cases de Sucesso.

## Pré-requisitos

1. Acesso ao painel do Supabase
2. Projeto Supabase configurado
3. Variáveis de ambiente configuradas no projeto

## Passos para Configuração

### 1. Acessar o SQL Editor

1. Faça login no [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. Vá para **SQL Editor** no menu lateral

### 2. Executar o Script SQL

1. Crie uma nova query
2. Copie e cole o conteúdo do arquivo `docs/supabase/case_studies.sql`
3. Execute o script

### 3. Verificar a Configuração

Após executar o script, você deve ver:

- Tabela `case_studies` criada
- 5 registros de exemplo inseridos
- Políticas de segurança configuradas
- Índices criados para performance

### 4. Verificar as Políticas de Segurança

As seguintes políticas são criadas automaticamente:

- **Leitura pública**: Qualquer pessoa pode ler os cases de sucesso
- **Inserção autenticada**: Apenas usuários autenticados podem inserir novos cases
- **Atualização autenticada**: Apenas usuários autenticados podem atualizar cases
- **Exclusão autenticada**: Apenas usuários autenticados podem excluir cases

## Estrutura da Tabela

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único (gerado automaticamente) |
| `slug` | TEXT | URL amigável (único) |
| `title` | TEXT | Título do case |
| `client_name` | TEXT | Nome do cliente |
| `problem_statement` | TEXT | Descrição do problema |
| `solution_provided` | TEXT | Descrição da solução |
| `results_achieved` | TEXT[] | Array com os resultados alcançados |
| `technologies_used` | TEXT[] | Array com as tecnologias utilizadas |
| `image_url` | TEXT | URL da imagem do case |
| `category` | TEXT | Categoria do case |
| `testimonial_quote` | TEXT | Depoimento do cliente (opcional) |
| `testimonial_author` | TEXT | Autor do depoimento (opcional) |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data de última atualização |

## Dados de Exemplo

O script inclui 5 cases de sucesso de exemplo:

1. **Aumento de 400% nas Conversões para E-commerce de Moda** (FashionNow)
2. **Desenvolvimento e Lançamento de Plataforma SaaS para Logística** (LogisTech)
3. **Transformação Digital Completa para Empresa de Consultoria** (ConsultPro)
4. **Aplicativo Mobile para Startup de Saúde Mental** (MindCare)
5. **Migração para Cloud de Empresa Financeira** (FinTech Solutions)

## Adicionando Novos Cases

Para adicionar novos cases de sucesso, você pode:

### Via SQL Editor
```sql
INSERT INTO case_studies (
  slug,
  title,
  client_name,
  problem_statement,
  solution_provided,
  results_achieved,
  technologies_used,
  image_url,
  category,
  testimonial_quote,
  testimonial_author
) VALUES (
  'seu-novo-case',
  'Título do Novo Case',
  'Nome do Cliente',
  'Descrição do problema...',
  'Descrição da solução...',
  ARRAY['Resultado 1', 'Resultado 2', 'Resultado 3'],
  ARRAY['Tecnologia 1', 'Tecnologia 2'],
  'https://sua-imagem.jpg',
  'Categoria',
  'Depoimento do cliente...',
  'Nome do Autor'
);
```

### Via Interface do Supabase
1. Vá para **Table Editor**
2. Selecione a tabela `case_studies`
3. Clique em **Insert row**
4. Preencha os campos necessários

## Troubleshooting

### Erro: "relation 'case_studies' does not exist"
- Verifique se o script SQL foi executado completamente
- Recarregue a página do SQL Editor

### Erro: "duplicate key value violates unique constraint"
- O slug já existe. Use um slug único para o novo case

### Erro de permissão
- Verifique se as políticas de segurança estão configuradas corretamente
- Confirme que você está autenticado (para operações de escrita)

## Próximos Passos

Após configurar a tabela:

1. Teste a funcionalidade no ambiente de desenvolvimento
2. Execute os testes: `npm run test:cases`
3. Verifique se os cases aparecem corretamente na página
4. Teste os filtros e busca

## Suporte

Se encontrar problemas:

1. Verifique os logs do console do navegador
2. Consulte os logs do Supabase
3. Execute os testes para identificar problemas específicos
4. Consulte a documentação do Supabase para mais detalhes 