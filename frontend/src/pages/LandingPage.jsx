
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="container">
          <div className="hero-content">
            <img src={logo} alt="Logo Brasil Letrado" className="hero-logo" />
            <h1 className="hero-title">Brasil Letrado</h1>
            <p className="hero-subtitle">
              Plataforma de gestão para ONGs e projetos sociais na alfabetização de jovens e adultos.
            </p>
            <div className="hero-buttons">
              <Link to="/cadastro" className="hero-btn primary">
                <i className="pi pi-rocket" />
                Começar Agora
              </Link>
              <a href="#sobre" className="hero-btn secondary">
                <i className="pi pi-info-circle" />
                Saiba Mais
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o Projeto */}
      <section id="sobre" className="landing-section about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Sobre o Projeto</h2>
            <p className="section-subtitle">
              Transformando vidas através da educação básica
            </p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                A alfabetização de jovens e adultos é um desafio que impacta milhões de brasileiros.
                Muitas ONGs e projetos sociais trabalham incansavelmente para mudar essa realidade,
                mas a falta de ferramentas de gestão pode dificultar o seu impacto.
              </p>
              <p>
                O Brasil Letrado foi desenvolvido para solucionar esse problema, oferecendo uma
                plataforma intuitiva e gratuita para gestão de educadores, turmas e alunos.
              </p>
            </div>
            <div className="ods-card">
              <div className="ods-icon">
                <i className="pi pi-book" />
              </div>
              <h3>ODS 4</h3>
              <p>Educação de Qualidade</p>
              <small>Garantir educação inclusiva e de qualidade para todos</small>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="landing-section how-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Como Funciona</h2>
            <p className="section-subtitle">
              Três passos simples para começar a transformar vidas
            </p>
          </div>
          <div className="how-cards">
            <div className="how-card">
              <div className="how-number">1</div>
              <div className="how-icon">
                <i className="pi pi-building" />
              </div>
              <h3>Cadastre sua Instituição</h3>
              <p>Crie sua conta gratuitamente e comece a organizar o seu projeto de alfabetização.</p>
            </div>
            <div className="how-card">
              <div className="how-number">2</div>
              <div className="how-icon">
                <i className="pi pi-users" />
              </div>
              <h3>Gerencie Educadores e Turmas</h3>
              <p>Adicione os educadores, crie turmas e organize horários e locais de aula.</p>
            </div>
            <div className="how-card">
              <div className="how-number">3</div>
              <div className="how-icon">
                <i className="pi pi-user-plus" />
              </div>
              <h3>Cadastre e Acompanhe Alunos</h3>
              <p>Matricule os alunos, registre o nível de alfabetização e acompanhe o progresso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="landing-section features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Funcionalidades</h2>
            <p className="section-subtitle">
              Tudo o que você precisa para gerenciar o seu projeto
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="pi pi-graduation-cap" />
              </div>
              <h3>Gestão de Educadores</h3>
              <p>Cadastre e gerencie os educadores voluntários ou contratados do seu projeto.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="pi pi-users" />
              </div>
              <h3>Gestão de Turmas</h3>
              <p>Organize as turmas por turno, dias da semana e capacidade máxima de alunos.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="pi pi-user-plus" />
              </div>
              <h3>Matrícula de Alunos</h3>
              <p>Cadastre alunos com dados pessoais e informações relevantes para o projeto.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="pi pi-chart-line" />
              </div>
              <h3>Acompanhamento de Nível</h3>
              <p>Registre e visualize o progresso dos alunos por nível de alfabetização.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="landing-section stats-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Estatísticas</h2>
            <p className="section-subtitle">
              Números que mostram o nosso impacto (dados simulados)
            </p>
          </div>
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-number">120+</div>
              <div className="stat-label">Instituições</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">480</div>
              <div className="stat-label">Educadores</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1.250</div>
              <div className="stat-label">Turmas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">8.500</div>
              <div className="stat-label">Alunos</div>
            </div>
          </div>
          <div className="levels-stats">
            <h3 className="levels-title">Distribuição dos Níveis de Alfabetização</h3>
            <div className="levels-bar-container">
              <div className="levels-bar">
                <div className="level-bar iniciante" style={{ width: '45%' }}>
                  <span>Iniciante</span>
                  <strong>45%</strong>
                </div>
                <div className="level-bar intermediario" style={{ width: '35%' }}>
                  <span>Intermediário</span>
                  <strong>35%</strong>
                </div>
                <div className="level-bar avancado" style={{ width: '20%' }}>
                  <span>Avançado</span>
                  <strong>20%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - Exibido apenas para usuários não autenticados */}
      {!isAuthenticated && (
        <section className="landing-section cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Pronto para começar?</h2>
              <p>
                Cadastre a sua instituição gratuitamente e junte-se a nós na luta pela educação de qualidade.
              </p>
              <Link to="/cadastro" className="cta-btn">
                <i className="pi pi-rocket" />
                Criar Conta Gratuita
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo-circle">
                <img src={logo} alt="Logo Brasil Letrado" />
              </div>
              <div className="footer-brand-text">
                <span className="footer-brand-name">Brasil Letrado</span>
                <span className="footer-brand-sub">Alfabetização de adultos</span>
              </div>
            </div>
            <div className="footer-links">
              <a href="#sobre">Sobre</a>
              <a href="#como-funciona">Como Funciona</a>
              <a href="#funcionalidades">Funcionalidades</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Brasil Letrado. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
