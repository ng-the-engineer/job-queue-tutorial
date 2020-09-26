import lineUp from './job'
import queue from './queue'

queue.on('ready', () => {
  const job1 = lineUp('Job 1')
  const job2 = lineUp('Job 2')
})
