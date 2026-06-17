import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import styles from './RoadmapDetail.module.css'

export default function RoadmapDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.roadmaps.get(id)
      .then(res => setRoadmap(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className={styles.center}><div className={styles.spinner} /></div>
  )

  if (error) return (
    <div className={styles.center}>
      <p className={styles.errorText}>{error}</p>
      <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>← Back</button>
    </div>
  )

  const phases = extractPhases(roadmap.content)

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>← Roadmaps</button>
        {roadmap.content && <span className={styles.badge}>AI</span>}
      </header>

      <div className={styles.container}>
        <h1 className={styles.title}>{roadmap.title}</h1>
        {roadmap.description && <p className={styles.description}>{roadmap.description}</p>}
        <p className={styles.meta}>{new Date(roadmap.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        {phases.length > 0 ? (
          <div className={styles.phases}>
            {phases.map((item, i) => <PhaseCard key={i} item={item} index={i} />)}
          </div>
        ) : roadmap.content ? (
          <pre className={styles.raw}>{typeof roadmap.content === 'string' ? roadmap.content : JSON.stringify(roadmap.content, null, 2)}</pre>
        ) : (
          <p className={styles.noContent}>No content — this roadmap was created manually.</p>
        )}
      </div>
    </div>
  )
}

function extractPhases(content) {
  if (!content) return []
  let p = content
  if (typeof p === 'string') { try { p = JSON.parse(p) } catch { return [] } }
  if (Array.isArray(p)) return p
  for (const k of ['phases', 'steps', 'roadmap', 'topics', 'sections', 'modules', 'stages', 'milestones']) {
    if (Array.isArray(p[k])) return p[k]
  }
  return []
}

function PhaseCard({ item, index }) {
  const title = item.phase || item.title || item.name || item.step || `Phase ${index + 1}`
  const desc = item.description || item.overview || item.summary || ''
  const topics = item.topics || item.skills || item.items || item.resources || item.technologies || []
  const duration = item.duration || item.timeframe || item.time || ''

  return (
    <div className={styles.phase}>
      <div className={styles.phaseNum}>{index + 1}</div>
      <div className={styles.phaseBody}>
        <div className={styles.phaseTop}>
          <h3 className={styles.phaseTitle}>{title}</h3>
          {duration && <span className={styles.phaseDuration}>{duration}</span>}
        </div>
        {desc && <p className={styles.phaseDesc}>{desc}</p>}
        {topics.length > 0 && (
          <div className={styles.topics}>
            {topics.map((t, i) => (
              <span key={i} className={styles.topic}>
                {typeof t === 'string' ? t : t.name || t.title || JSON.stringify(t)}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
