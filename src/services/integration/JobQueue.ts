import { QueueJobModel } from '../../types/integration';
import { EventBus } from './EventBus';

export class JobQueue {
  private static instance: JobQueue;
  private queue: QueueJobModel[] = [];
  private isProcessing = false;

  private constructor() {}

  static getInstance(): JobQueue {
    if (!JobQueue.instance) {
      JobQueue.instance = new JobQueue();
    }
    return JobQueue.instance;
  }

  addJob(type: QueueJobModel['type'], payload: Record<string, any>): QueueJobModel {
    const job: QueueJobModel = {
      id: `job_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      type,
      payload,
      status: 'pending',
      retryCount: 0,
      createdAt: new Date().toISOString(),
    };

    this.queue.push(job);
    EventBus.getInstance().publish('JOB_ADDED', job);
    this.processQueue();
    return job;
  }

  getJobs(): QueueJobModel[] {
    return [...this.queue];
  }

  private async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.some((j) => j.status === 'pending')) {
      const job = this.queue.find((j) => j.status === 'pending');
      if (!job) break;

      job.status = 'processing';
      EventBus.getInstance().publish('JOB_UPDATED', job);

      try {
        // Simulate async processing delay
        await new Promise((res) => setTimeout(res, 800));
        job.status = 'completed';
        job.processedAt = new Date().toISOString();
        EventBus.getInstance().publish('JOB_COMPLETED', job);
      } catch (err) {
        job.retryCount += 1;
        if (job.retryCount > 3) {
          job.status = 'failed';
          EventBus.getInstance().publish('JOB_FAILED', job);
        } else {
          job.status = 'pending';
        }
      }
    }

    this.isProcessing = false;
  }
}
