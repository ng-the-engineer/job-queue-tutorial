### Tutorial 1 - Basic Job Queue with Retry


#### Quick start

1. [Spin off Redis official container.](https://gist.github.com/ng-the-engineer/d1b98a27fab34a4907e7fb9b442bf273)

2. Clone this repo, go to folder `01_job_queue`.

3. Run `yarn` to install the dependencies

4. Run `yarn start` to start the app.

##### Summary of the app
This app demonstrate a job queue accepting two jobs. The job generates a random number and compare to a threshold. If it is greater than the threshold, a error is thrown and the job will re-queue. Or else the job succeed and leave the queue.

##### A sample output
```
01 ➜  01_job_queue git:(master) ✗ yarn start
02 yarn run v1.22.4
03 $ rm -rf lib/ && babel -d lib/ src/ && node lib/app.js --unhandled-rejections=strict
04 Successfully compiled 4 files with Babel (384ms).
05 2020-09-26T20:38:16.857Z jobId: 3 is placed in queue.
06 2020-09-26T20:38:16.860Z jobId: 4 is placed in queue.
07 2020-09-26T20:38:16.864Z jobId: 3 failed as Random value 4.671 > threshold 4.5 but is gonna retry! (Retry count: 1)
08 2020-09-26T20:38:16.867Z jobId: 4 failed as Random value 5.727 > threshold 4.5 but is gonna retry! (Retry count: 1)
09 2020-09-26T20:38:17.876Z jobId: 3 failed as Random value 5.156 > threshold 4.5 but is gonna retry! (Retry count: 2)
10 2020-09-26T20:38:17.879Z jobId: 4 received good result 3.965.
11 2020-09-26T20:38:18.882Z jobId: 3 failed as Random value 5.755 > threshold 4.5 but is gonna retry! (Retry count: 3)
12 2020-09-26T20:38:19.893Z jobId: 3 failed as Random value 6.450 > threshold 4.5 but is gonna retry! (Retry count: 4)
13 2020-09-26T20:38:20.903Z jobId: 3 failed as Random value 6.222 > threshold 4.5 but is gonna retry! (Retry count: 5)
14 2020-09-26T20:38:21.909Z jobId: 3 received good result 3.514.
```

| line #  | Explanation    |
| ------- |:--------------:|
| 03      | Remove current build directory, re-build, and start the app  |
| 05      | JobId: 3 is added to the queue and waiting to process        |
| 06      | JobId: 4 is added to the queue and waiting to process        |
| 07      | JobId: 3 started to process, but the job failed, and re-join to the queue |
| 08      | JobId: 4 started to process, but the job failed, and re-join to the queue |
| 10      | JobId: 4 succeed at the second attempt |
| 14      | JobId: 3 succeed at the fifth attempt |



