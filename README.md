# Gotask

Um gestor de tarefas estilo Kanban moderno, robusto e totalmente responsivo, focado em performance e reatividade. Este projeto utiliza o ecossistema avançado do Angular para gerenciar estados complexos e interações fluidas de arrastar e soltar.

## Tecnologias e Ferramentas

- **Angular**: Utilização das funcionalidades mais recentes como (`@for`, `@if`, `@let`).
- **RxJS & BehaviorSubject**: Gestão de estado reativa e centralizada
- **Angular Material CDK**:
  - `Drag and Drop`: Movimentação intuitiva de tarefas entre colunas.
  - `Dialog (Modais)`: Gestão centralizada de janelas para criação, edição e comentários.
- **Tailwind CSS**: Estilização utilitária com abordagem **Mobile First** e design totalmente responsivo.
- **Reactive Forms**: Manipulação rigorosa de dados e validações de formulários.

## Funcionalidades Principais

- **Fluxo Kanban Completo**: Colunas para "A fazer", "Fazendo" e "Concluído".
- **Persistência de Dados**: Integração com `localStorage` para que os dados não se percam ao atualizar a página.
- **Gestão de Tarefas**: Criar, Editar e Eliminar tarefas com IDs únicos gerados por timestamp.
- **Sistema de Comentários**: Possibilidade de adicionar múltiplos comentários a cada tarefa.
- **Interface Reativa**: Uso de `Async Pipe` para subscrições automáticas e prevenção de memory leaks.
- **Imutabilidade**: Implementação de `structuredClone` para garantir a integridade dos dados durante o fluxo de estado.

## Arquitetura

### 1. State Management (Serviço como Fonte da Verdade)

O `TaskService` centraliza toda a lógica de negócio. Através de `BehaviorSubject`, o estado das tarefas é distribuído pela aplicação. Sempre que uma lista é emitida, o serviço salva automaticamente no `localStorage`

### 2. Modais Descentralizados

Utilização de um `ModalControllerService` que injeta o `Dialog` do CDK. Isto permite abrir formulários de criação, edição ou janelas de comentários de qualquer parte da aplicação de forma limpa e tipada.

### 3. Drag and Drop

A implementação utiliza as diretivas `cdkDropList` e `cdkDrag`, permitindo a transferência de itens entre listas conectadas com atualização instantânea do estado no serviço.

### 4. UI/UX Responsiva

Desenvolvido com Tailwind CSS, o quadro Kanban adapta-se a qualquer ecrã:

- **Mobile**: Scroll horizontal suave entre colunas.
- **Desktop**: Visualização completa em grelha.

### Aprendizados

Este projeto foi uma excelente oportunidade para aprofundar conhecimentos em arquitetura de software e boas práticas com Angular.

### 1. Reatividade e State Management

O maior aprendizado foi implementar o padrão de Fonte Única de Verdade. Ao utilizar `BehaviorSubject` dentro de um serviço, garanti que o estado da aplicação fosse previsível. Fiz Uso do `structuredClone` e do operador `map` no RxJS para garantir que os componentes recebam cópias dos dados, mantendo a imutabilidade do estado original.

### 2. Ciclo de Vida e Performance com Async Pipe

Optei pelo uso do `Async Pipe` em conjunto com o `@let`. Isso reduziu drasticamente a necessidade de gerenciar subscrições manualmente (`.subscribe()`), evitando vazamentos de memória (memory leaks) e tornando o código do template muito mais limpo e declarativo.

### 3. Manipulação Avançada de DOM com CDK

A implementação do `Drag and Drop` exigiu um entendimento claro de como o Angular material lida com listas conectadas. Foi necessário lógica extra no serviço para interceptar o evento de "drop" e sincronizar as mudanças visuais com a atualização do `localStorage`.

### 4. Arquitetura de Modais

Em vez de declarar modais dentro de cada componente, foi criado um **ModalControllerService**. Isso centralizou a configuração de estilo e a lógica de abertura, permitindo que a aplicação seja escalável e que novos modais sejam adicionados com poucas linhas de código.

### Como Executar

Instalar dependências:

### npm install

Executar o projeto:

### ng serve
