Análise Arquitetural Completa
Criei uma análise detalhada das principais falhas arquiteturais do seu código. Aqui está um resumo executivo:

🔴 Falhas Críticas Identificadas

1. Entidades de Domínio Não Utilizadas
   Você criou classes de entidade com encapsulamento (
   UserEntity
   , AuthSessionEntity), mas os repositórios retornam apenas interfaces simples. As entidades são código morto - nunca são instanciadas.

2. Vulnerabilidade de Segurança - Tokens Compartilhados
   A tabela email_verification_tokens é usada tanto para verificação de email quanto para reset de senha. Isso significa que um token de verificação pode ser usado para resetar senha - falha crítica de segurança.

3. Confusão de Services
   IAuthSessionService
   está em domain/services mas depende de repositórios e infraestrutura. Isso viola a Arquitetura Limpa - o domínio não deveria conhecer infraestrutura.

4. Duplicação Massiva de Código
   A lógica de geração de token está duplicada identicamente em
   SignupUseCase
   e
   SendResetPasswordEmailUseCase
   .

5. Controllers Fazendo Mapeamento Manual
   Sem validação em runtime, vulnerável a ataques com campos extras.

🟡 Falhas Moderadas
Falta de Value Objects (email, password são strings primitivas)
Use Cases com múltiplas responsabilidades (enviam emails, conhecem URLs)
Ausência de Agregados (User deveria gerenciar suas próprias sessões)
Sem Domain Events (ações importantes não são rastreadas)
Repositories anêmicos (apenas wrappers do Prisma)
📋 Prioridades de Refatoração
Alta Prioridade:

Separar tabelas de tokens (segurança)
Implementar uso de entidades de domínio
Eliminar duplicação de código
Média Prioridade: 4. Reorganizar services 5. Adicionar validação com Zod 6. Criar Value Objects

Veja a análise completa no documento criado para detalhes, exemplos de código e soluções propostas.
