# ♟️ Comparador Visual de Heurísticas A\* para o Cavalo

Este projeto é uma aplicação web interativa desenvolvida em React com TypeScript e Tailwind CSS que visualiza e compara o desempenho de duas heurísticas diferentes (uma fraca e uma forte) para o algoritmo de busca A\*. O objetivo é encontrar o caminho de menor custo para uma peça de Cavalo em um tabuleiro 8x8 com custos de terreno variáveis e gerados proceduralmente.

## ✨ Funcionalidades Principais

- **Comparação Lado a Lado:** Exibe dois tabuleiros idênticos, cada um utilizando uma heurística diferente para a busca A\*.
- **Heurísticas Implementadas:**
  - **H1 (Fraca):** Baseada na Distância de Chebyshev.
  - **H2 (Forte):** Baseada em uma fórmula matemática que estima o número mínimo de saltos do cavalo.
- **Geração Procedural de Tabuleiro:** Cria tabuleiros 8x8 aleatórios com diferentes tipos de terreno (Estrada, Terra, Lama, Barreira) baseados em uma _seed_ (timestamp), garantindo reprodutibilidade.
- **Custos de Terreno Variáveis:** Cada tipo de terreno tem um custo associado para entrar na célula.
- **Movimentação do Cavalo:** Implementa a lógica correta de movimento em "L" do cavalo.
- **Visualização da Busca:**
  - Animação do cavalo percorrendo o caminho encontrado.
  - Destaque progressivo do caminho ótimo.
  - Exibição dos nós expandidos (visitados) pela busca A\* (após a animação).
- **Métricas de Desempenho:** Exibe o número total de nós expandidos e o custo total do caminho encontrado para cada heurística.
- **Interatividade:** Permite ao usuário definir as coordenadas de início e fim da busca.
- **Legenda Visual:** Explica o significado das cores de cada célula no tabuleiro.

## 🚀 Tecnologias Utilizadas

- **Frontend:** React (com TSX)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Geração de Números Aleatórios:** `seedrandom`
- **Ambiente de Execução:** Node.js (para desenvolvimento)

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar a aplicação na sua máquina.

### Pré-requisitos

- Node.js (versão LTS recomendada, ex: 20.x)
- npm (geralmente instalado com o Node.js)

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/EmmanuelBMoraes/aStart
    cd aStar
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
    _(Isso instalará React, TypeScript, Tailwind, seedrandom e outras dependências listadas no `package.json`)_.

### Executando a Aplicação

1.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

2.  **Abra no navegador:** A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

## 🎮 Como Usar

1.  **Gerar Tabuleiros:** Ao carregar, um tabuleiro aleatório é gerado. Clique no botão "Gerar Tabuleiros" para criar um novo mapa (com uma nova _seed_). Os dois tabuleiros sempre serão idênticos.
2.  **(Opcional) Definir Início/Fim:** Use os campos "Início (X,Y)" e "Fim (X,Y)" para definir as coordenadas desejadas (0 a 7). O tabuleiro será regenerado automaticamente para garantir que os pontos não sejam barreiras.
3.  **Encontrar Caminhos:** Clique no botão "Encontrar Caminhos". O algoritmo A\* será executado para ambas as heurísticas.
4.  **Visualizar:** Observe a animação do cavalo percorrendo o caminho encontrado em cada tabuleiro. As células do caminho serão destacadas progressivamente.
5.  **Analisar Resultados:** Após a animação, os nós expandidos por cada busca serão marcados com um X, e as estatísticas (Nós expandidos, Custo total) aparecerão acima de cada tabuleiro. Compare a eficiência visual e numérica.

## 🧠 Conceitos Implementados

- **Algoritmo A\*:** Implementação do A\* (f = g + h) para busca de caminho de menor custo.
  - `g`: Custo real acumulado do início até o nó atual.
  - `h`: Custo heurístico estimado do nó atual até o fim.
  - Lista Aberta (implícita na ordenação/busca) e Lista Fechada (visualizada).
- **Heurísticas Admissíveis:**
  - **H1 (Fraca):** h1(n) = (⌈ max(x, y) / 3⌉) custo min.
  - Subestima grosseiramente, levando a uma exploração ampla.
  - **H2 (Forte):** h2(n) = max(⌈x/2⌉ ,⌈y/2⌉ ,⌈(x, y) / 3⌉) custo min.
  - Estima melhor os movimentos do cavalo, guiando a busca de forma mais eficiente.
- **Geração Procedural:** Uso de `seedrandom` para criar tabuleiros aleatórios e reprodutíveis com base em uma _seed_.
