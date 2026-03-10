import { useMemo, useState } from 'react';

const ranks = [
  { name: 'Plebeu', cap: 400 },
  { name: 'Escudeiro', cap: 700 },
  { name: 'Cavaleiro', cap: 1100 },
  { name: 'Nobre', cap: 1500 },
  { name: 'Rei', cap: 2000 },
];

const questList = [
  {
    title: 'Video: Verb To Be',
    meta: '5 min',
    exp: 60,
  },
  {
    title: 'Speaking: Apresentacao',
    meta: 'Audio + correcoes',
    exp: 90,
  },
  {
    title: 'Exercicio 10/10',
    meta: 'Bonus de acerto perfeito',
    exp: 120,
  },
];

export default function App() {
  const baseXp = 240;
  const [completed, setCompleted] = useState(() => new Set());

  const earnedXp = useMemo(() => {
    let total = 0;
    completed.forEach((index) => {
      total += questList[index]?.exp ?? 0;
    });
    return total;
  }, [completed]);

  const currentXp = baseXp + earnedXp;

  const progress = useMemo(() => {
    let total = 0;
    let previousCap = 0;
    let currentRank = ranks[0];

    for (const rank of ranks) {
      total += rank.cap;
      if (currentXp < total) {
        currentRank = rank;
        break;
      }
      previousCap = total;
    }

    const inRankXp = currentXp - previousCap;
    const percent = Math.min((inRankXp / currentRank.cap) * 100, 100);
    const currentIndex = ranks.findIndex((rank) => rank.name === currentRank.name);
    const nextRank = ranks[currentIndex + 1];

    return {
      currentRank,
      inRankXp,
      percent,
      nextRank,
    };
  }, [currentXp]);

  const handleComplete = (index) => {
    setCompleted((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  return (
    <>
      <div className="grain"></div>
      <header className="hero">
        <nav className="nav">
          <div className="logo">Master Class</div>
          <div className="nav-links">
            <a href="#aventura">Aventura</a>
            <a href="#conteudo">Conteudo</a>
            <a href="#planos">Planos</a>
            <a href="#dashboard">Demo</a>
          </div>
          <button className="btn ghost">Entrar</button>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="tag">LoFi medieval + progresso real</p>
            <h1>Aprenda ingles como uma jornada.</h1>
            <p className="subtitle">
              Uma plataforma automatizada e gamificada, com conteudo organizado
              por niveis e uma experiencia relaxante. Ganhe EXP ao assistir videos,
              concluir exercicios e falar corretamente.
            </p>
            <div className="hero-cta">
              <button className="btn">Comecar gratuito</button>
              <button className="btn ghost">Ver trilha</button>
            </div>
            <div className="hero-stats">
              <div>
                <span className="stat">120+</span>
                <span className="label">micro-licoes</span>
              </div>
              <div>
                <span className="stat">7</span>
                <span className="label">modulos por nivel</span>
              </div>
              <div>
                <span className="stat">3</span>
                <span className="label">planos</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="avatar">
              <div className="avatar-ring"></div>
              <div className="avatar-face"></div>
            </div>
            <div className="rank">
              <span className="rank-title">{progress.currentRank.name}</span>
              <span className="rank-xp">
                XP {progress.inRankXp} / {progress.currentRank.cap}
              </span>
            </div>
            <div className="progress">
              <div className="progress-bar" style={{ width: `${progress.percent}%` }}></div>
            </div>
            <div className="quest">
              <div className="quest-title">Missao atual</div>
              <div className="quest-body">Complete 3 exercicios de "Verb To Be".</div>
              <button className="btn small">Continuar</button>
            </div>
            <div className="hero-footer">
              <span>Streak: 6 dias</span>
              <span>
                Rank proximo: {progress.nextRank ? progress.nextRank.name : 'Maximo'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <section id="aventura" className="section">
        <div className="section-title">
          <h2>Aventura personalizada</h2>
          <p>Trilha adaptada ao nivel do aluno, com feedback imediato.</p>
        </div>
        <div className="grid three">
          <div className="card">
            <h3>Mapa de jornada</h3>
            <p>
              Cada missao desbloqueia a proxima. Ganhe EXP por acertos perfeitos,
              revisoes e participacao.
            </p>
          </div>
          <div className="card">
            <h3>Estetica LoFi</h3>
            <p>Interface calma, com cores quentes e ritmo suave para manter o foco.</p>
          </div>
          <div className="card">
            <h3>Rank medieval</h3>
            <p>Suba de Plebeu a Rei. Cada nivel traz novas areas e desafios.</p>
          </div>
        </div>
      </section>

      <section id="conteudo" className="section alt">
        <div className="section-title">
          <h2>Estrutura de conteudo</h2>
          <p>Base modular para adaptar seus videos, textos e exercicios.</p>
        </div>
        <div className="grid two">
          <div className="card">
            <h3>Fundamentos</h3>
            <ul className="list">
              <li>Verb To Be e pronomes</li>
              <li>Tempos basicos</li>
              <li>Vocabulario de sobrevivencia</li>
              <li>Listening curto e repeticao</li>
            </ul>
          </div>
          <div className="card">
            <h3>Intermediario e Avancado</h3>
            <ul className="list">
              <li>Tempos perfeitos e condicionais</li>
              <li>Conversacao guiada</li>
              <li>Leitura critica</li>
              <li>Escrita aplicada</li>
            </ul>
          </div>
        </div>
        <div className="grid three">
          <div className="chip">Grammar</div>
          <div className="chip">Vocabulary</div>
          <div className="chip">Listening</div>
          <div className="chip">Reading</div>
          <div className="chip">Speaking</div>
          <div className="chip">Writing</div>
        </div>
      </section>

      <section id="dashboard" className="section">
        <div className="section-title">
          <h2>Demo de progresso</h2>
          <p>Simule como o aluno evolui ao completar atividades.</p>
        </div>
        <div className="dashboard">
          <div className="panel">
            <h3>Quests do dia</h3>
            <div className="quest-list">
              {questList.map((quest, index) => {
                const isDone = completed.has(index);
                return (
                  <div className="quest-item" key={quest.title}>
                    <div>
                      <div className="quest-name">{quest.title}</div>
                      <div className="quest-meta">{quest.meta}</div>
                    </div>
                    <button
                      className={`btn small${isDone ? ' ghost' : ''}`}
                      onClick={() => handleComplete(index)}
                      disabled={isDone}
                      type="button"
                    >
                      {isDone ? 'Concluido' : 'Concluir'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="panel highlight">
            <h3>Seu status</h3>
            <div className="status">
              <div>
                <div className="status-label">Rank atual</div>
                <div className="status-value">{progress.currentRank.name}</div>
              </div>
              <div>
                <div className="status-label">EXP</div>
                <div className="status-value">
                  {progress.inRankXp} / {progress.currentRank.cap}
                </div>
              </div>
            </div>
            <div className="progress big">
              <div className="progress-bar" style={{ width: `${progress.percent}%` }}></div>
            </div>
            <div className="status-note">
              {progress.nextRank
                ? `Faltam ${progress.currentRank.cap - progress.inRankXp} XP para ${progress.nextRank.name}`
                : 'Rank maximo alcancado.'}
            </div>
          </div>
        </div>
      </section>

      <section id="planos" className="section alt">
        <div className="section-title">
          <h2>Planos</h2>
          <p>De gratuito a consultoria individual.</p>
        </div>
        <div className="grid three">
          <div className="card pricing">
            <h3>Free</h3>
            <p className="price">R$ 0</p>
            <ul className="list">
              <li>Acesso a aulas abertas</li>
              <li>SEO para buscas organicas</li>
              <li>Missao diaria basica</li>
            </ul>
            <button className="btn ghost">Comecar</button>
          </div>
          <div className="card pricing accent">
            <h3>Pro</h3>
            <p className="price">R$ 49</p>
            <ul className="list">
              <li>Trilha completa por nivel</li>
              <li>Correcoes automatizadas</li>
              <li>Ranking e desafios semanais</li>
            </ul>
            <button className="btn">Assinar</button>
          </div>
          <div className="card pricing">
            <h3>Mentoria</h3>
            <p className="price">R$ 199</p>
            <ul className="list">
              <li>Aulas individuais com voce</li>
              <li>Consultoria de metas</li>
              <li>Plano personalizado</li>
            </ul>
            <button className="btn ghost">Agendar</button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="cta">
          <h2>Pronto para transformar aprendizado em aventura?</h2>
          <p>Comece com o conteudo gratuito e evolua quando quiser.</p>
          <button className="btn">Criar conta</button>
        </div>
      </section>

      <footer className="footer">
        <div>Master Class © 2026</div>
        <div>Contato: seuemail@dominio.com</div>
      </footer>
    </>
  );
}
