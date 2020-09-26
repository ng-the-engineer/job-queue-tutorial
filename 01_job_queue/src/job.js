import queue from './queue'

const retryCount = 20

const lineUp = async (payload) => {
  const job = await queue.createJob(payload)
                    .backoff('fixed', 1000)
                    .retries(retryCount)
                    .save()

  console.log(`${new Date().toISOString()} jobId: ${job.id} is placed in queue.`)

  job.on('succeeded', (result) => {
    console.log(`${new Date().toISOString()} jobId: ${job.id} received good result ${result}.`)
  })

  job.on('retrying', (err) => {
    console.log(`${new Date().toISOString()} jobId: ${job.id} failed as ${err.message} but is gonna retry! (Retry count: ${retryCount - job.options.retries})`)
  })

  return job
}

export default lineUp