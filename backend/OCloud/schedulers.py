import socket

from django.conf import settings
from django.core.cache import caches
from django_celery_beat.schedulers import DatabaseScheduler


class LockedSchedulerMixin:
    max_interval = getattr(settings, "CELERYBEAT_LOCK_TIMEOUT", 5)
    lock_key = getattr(settings, "CELERYBEAT_LOCK_KEY", "celerybeat-lock")
    cache_name = getattr(settings, "CELERYBEAT_LOCK_CACHE", "default")

    def tick(self):
        cache = caches[self.cache_name]
        selfhost = socket.gethostname()
        beathost = cache.get(self.lock_key)

        if beathost is None:
            if cache.add(self.lock_key, selfhost, self.max_interval):
                self.logger.debug("Acquired lock Running TICK")
                return super().tick()

        elif selfhost == beathost:
            self.logger.debug("Running TICK")
            return super().tick()

        self.logger.debug("No TICK")
        return self.max_interval


class LockedDatabaseScheduler(LockedSchedulerMixin, DatabaseScheduler):
    pass
