import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { api } from '../lib/api'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()

  const [roadmaps, setRoadmaps] = useState([])
  const [loading, setLoading] = useState(true)

  const [showCreate, setShowCreate] = useState(false)
  const [createTitle, setCreateTitle] = useState('')
  const [createDesc, setCreateDesc] = useState('')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')

  const [showGenerate, setShowGenerate] = useState(false)
  const [goal, setGoal] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generateError, setGenerateError] = useState('')
  const [generateSuccess, setGenerateSuccess] = useState(false)

  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => { fetch() }, [])

  async function fetch() {
    setLoading(true)
    try { const r = await api.roadmaps.list(); setRoadmaps(r.data) }
    catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  async function handleCreate(e) {
    e.preventDefault()
    setCreateError('')
    setCreating(true)
    try {
      const r = await api.roadmaps.create(createTitle, createDesc)
      setRoadmaps(p => [r.data, ...p])
      setShowCreate(false); setCreateTitle(''); setCreateDesc('')
    } catch (err) { setCreateError(err.message) }
    finally { setCreating(false) }
  }

  async function handleGenerate(e) {
    e.preventDefault()
    setGenerateError('')
    setGenerating(true)
    try {
      const r = await api.ai.generate(goal)
      setRoadmaps(p => [r.data, ...p])
      setGenerateSuccess(true)
      setTimeout(() => { setShowGenerate(false); setGoal(''); setGenerateSuccess(false) }, 1500)
    } catch (err) { setGenerateError(err.message) }
    finally { setGenerating(false) }
  }

  async function handleDelete(id) {
    setDeletingId(id)
    try {
      await api.roadmaps.delete(id)
      setRoadmaps(p => p.filter(r => r.id !== id))
    } catch (e) { console.error(e) }
    finally { setDeletingId(null) }
  }

  const email = user?.email || ''
  const initials = email[0]?.toUpperCase() || '?'

  return (
    <div className={styles.layout}>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.brand}>Syllable</div>
          <nav className={styles.nav}>
            <span className={`${styles.navItem} ${styles.active}`}>Roadmaps</span>
          </nav>
        </div>
        <div className={styles.sidebarBottom}>
          <button className={styles.themeBtn} onClick={toggle} title="Toggle theme">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <div className={styles.userRow}>
            <div className={styles.avatar}>{initials}</div>
            <span className={styles.userEmail}>{email}</span>
          </div>
          <button className={styles.logoutBtn} onClick={() => { logout(); navigate('/login') }}>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Roadmaps</h1>
          <div className={styles.actions}>
            <button className={styles.btnOutline} onClick={() => setShowGenerate(true)}>Generate</button>
            <button className={styles.btnSolid} onClick={() => setShowCreate(true)}>+ New</button>
          </div>
        </div>

        <div className={styles.content}>
          {loading ? (
            <div className={styles.center}><div className={styles.spinner} /></div>
          ) : roadmaps.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>No roadmaps yet</p>
              <p className={styles.emptyText}>Create one or generate with AI.</p>
              <div className={styles.emptyActions}>
                <button className={styles.btnOutline} onClick={() => setShowGenerate(true)}>Generate</button>
                <button className={styles.btnSolid} onClick={() => setShowCreate(true)}>+ New</button>
              </div>
            </div>
          ) : (
            <div className={styles.grid}>
              {roadmaps.map(r => (
                <div key={r.id} className={styles.card} onClick={() => navigate(`/roadmaps/${r.id}`)}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardTitle}>{r.title}</span>
                    <button className={styles.deleteBtn}
                      onClick={e => { e.stopPropagation(); handleDelete(r.id) }}
                      disabled={deletingId === r.id}>
                      {deletingId === r.id ? '…' : '×'}
                    </button>
                  </div>
                  {r.description && <p className={styles.cardDesc}>{r.description}</p>}
                  <div className={styles.cardMeta}>
                    <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                    {r.content && <span className={styles.aiBadge}>AI</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create modal */}
      {showCreate && (
        <div className={styles.overlay} onClick={() => setShowCreate(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>New Roadmap</h2>
              <button className={styles.closeBtn} onClick={() => setShowCreate(false)}>×</button>
            </div>
            <form onSubmit={handleCreate} className={styles.form}>
              {createError && <div className={styles.errorBox}>{createError}</div>}
              <div className={styles.field}>
                <label className={styles.label}>Title</label>
                <input className={styles.input} placeholder="e.g. Backend Engineering"
                  value={createTitle} onChange={e => setCreateTitle(e.target.value)} required autoFocus />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Description <span className={styles.opt}>(optional)</span></label>
                <textarea className={styles.textarea} rows={3} placeholder="What's this about?"
                  value={createDesc} onChange={e => setCreateDesc(e.target.value)} />
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.btnOutline} onClick={() => setShowCreate(false)}>Cancel</button>
                <button type="submit" className={styles.btnSolid} disabled={creating}>
                  {creating ? 'Creating…' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generate modal */}
      {showGenerate && (
        <div className={styles.overlay} onClick={() => { setShowGenerate(false); setGoal(''); setGenerateError(''); setGenerateSuccess(false) }}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Generate with AI</h2>
              <button className={styles.closeBtn} onClick={() => setShowGenerate(false)}>×</button>
            </div>
            {generateSuccess ? (
              <p className={styles.successMsg}>Roadmap generated and added.</p>
            ) : (
              <form onSubmit={handleGenerate} className={styles.form}>
                {generateError && <div className={styles.errorBox}>{generateError}</div>}
                <div className={styles.field}>
                  <label className={styles.label}>Your learning goal</label>
                  <input className={styles.input} placeholder="e.g. Become a DevOps engineer"
                    value={goal} onChange={e => setGoal(e.target.value)} required autoFocus />
                </div>
                {generating && <div className={styles.progressBar}><div className={styles.progressInner} /></div>}
                <div className={styles.modalFooter}>
                  <button type="button" className={styles.btnOutline} onClick={() => setShowGenerate(false)}>Cancel</button>
                  <button type="submit" className={styles.btnSolid} disabled={generating}>
                    {generating ? 'Generating…' : 'Generate'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
