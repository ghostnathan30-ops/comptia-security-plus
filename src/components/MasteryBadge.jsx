const labels = {
  notStarted: 'Not Started',
  inProgress: 'In Progress',
  mastered: 'Mastered',
};

const classes = {
  notStarted: 'not-started',
  inProgress: 'in-progress',
  mastered: 'mastered',
};

const icons = {
  notStarted: '○',
  inProgress: '◐',
  mastered: '●',
};

export default function MasteryBadge({ state = 'notStarted' }) {
  return (
    <span className={`mastery-badge ${classes[state]}`}>
      {icons[state]} {labels[state]}
    </span>
  );
}
