document.addEventListener('DOMContentLoaded', () => {
  // ===== Navegação suave =====
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 20, behavior: 'smooth' });
      }
    });
  });

  // ===== Chatbot Zinho =====
  const zinhoBotao = document.getElementById('zinho-botao');
  const zinhoChat = document.getElementById('zinho-chat');
  const mensagensZinho = document.querySelector('.zinho-mensagens');
  const botoesPerguntas = document.querySelectorAll('.zinho-perguntas button');

  // Toggle do chat
  zinhoBotao?.addEventListener('click', () => {
    const aberto = zinhoChat.style.display === 'block';
    zinhoChat.style.display = aberto ? 'none' : 'block';
  });

  // Respostas do chatbot
  const respostas = {
    faixa: "As faixas indicam o progresso do aluno no Jiu-Jitsu, do iniciante ao mestre.",
    kimono: "Recomendamos kimonos de algodão, próprios para Jiu-Jitsu, nas cores branca, azul ou preta.",
    graduacao: "A graduação segue critérios técnicos, tempo de treino e desempenho do aluno.",
    objetivo: "O objetivo é evolução pessoal, disciplina, defesa pessoal e superação constante.",
    treinamento: "Veja nossos horários de treino na seção de Treinamentos."
  };

  botoesPerguntas.forEach(btn => {
    btn.addEventListener('click', () => {
      const topico = btn.dataset.topico;
      const resposta = respostas[topico] || "Desculpe, não entendi sua pergunta.";
      const novaMsg = document.createElement('div');
      novaMsg.className = 'msg-zinho';
      novaMsg.textContent = '';
      mensagensZinho.appendChild(novaMsg);
      
      // Simula a digitação
      let i = 0;
      function digitarTexto() {
        if (i < resposta.length) {
          novaMsg.textContent += resposta.charAt(i);
          i++;
          setTimeout(digitarTexto, 30); // velocidade da digitação (30ms por letra)
        } else {
          mensagensZinho.scrollTop = mensagensZinho.scrollHeight;
          document.getElementById('limpar-chat').addEventListener('click', function() {
            document.getElementById('zinho-mensagens').innerHTML = '';
          });
        }
      }
      digitarTexto();
      

      if (topico === 'treinamento') {
        mostrarTreinamento();
      }
    });
  });

  // ===== Slideshow =====
  let slideIndex = 0;
  const slides = document.getElementsByClassName('mySlides');

  function showSlides() {
    Array.from(slides).forEach(slide => (slide.style.display = 'none'));
    slideIndex = (slideIndex + 1 > slides.length) ? 1 : slideIndex + 1;
    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = 'block';
    }
    setTimeout(showSlides, 3000);
  }

  showSlides();

  // ===== Carrinho de Compras =====
  const listaCarrinho = document.getElementById('itens-carrinho');
  const valorTotalEl = document.getElementById('valor-total');
  let totalCarrinho = 0;

  const produtos = {
    "Faixa Azul": 150.00,
    "Kimono Tradicional": 299.90,
    "Rash Guard": 149.90,
    "Protetor Bucal": 39.90
  };

  window.adicionarAoCarrinho = function(produto) {
    const preco = produtos[produto] || 0;
    const li = document.createElement('li');
    li.textContent = `${produto} - R$ ${preco.toFixed(2)}`;
    listaCarrinho.appendChild(li);
    totalCarrinho += preco;
    valorTotalEl.textContent = `Total: R$ ${totalCarrinho.toFixed(2)}`;
  };

  window.limparCarrinho = function() {
    listaCarrinho.innerHTML = '';
    totalCarrinho = 0;
    valorTotalEl.textContent = `Total: R$ 0,00`;
  };

  // ===== Formulário de Aula Experimental =====
  const formAula = document.getElementById('form-aula');
  const msgConfirmacao = document.getElementById('mensagem-confirmacao');

  if (formAula) {
    formAula.addEventListener('submit', e => {
      e.preventDefault();
      formAula.reset();
      msgConfirmacao.style.display = 'block';
      setTimeout(() => msgConfirmacao.style.display = 'none', 5000);
    });
  }
});

// ===== Função para scroll até seção de Treinamento =====
function mostrarTreinamento() {
  const secao = document.getElementById('treinamentos');
  if (secao) {
    secao.scrollIntoView({ behavior: 'smooth' });
  }
}
