import logging
import socket
from unittest.mock import MagicMock

from django.core.cache import caches
from django.test import TestCase

from OCloud.schedulers import LockedSchedulerMixin


class BaseTestScheduler:
    logger = logging.getLogger("test_scheduler")

    def tick(self):
        pass


class TestLockedScheduler(LockedSchedulerMixin, BaseTestScheduler):
    pass


class LockedSchedulerMixinTestCase(TestCase):
    def setUp(self):
        self.scheduler = TestLockedScheduler()
        self.cache = caches[self.scheduler.cache_name]
        self.key = self.scheduler.lock_key

    def test_lock_free(self):
        self.cache.delete(self.key)
        self.scheduler.tick()
        self.assertEqual(self.cache.get(self.key), socket.gethostname())

    def test_lock_free_fail(self):
        self.cache.delete(self.key)
        self.cache.add = MagicMock(return_value=False)
        self.scheduler.tick()
        self.assertEqual(self.cache.get(self.key), None)

    def test_lock_self(self):
        self.cache.set(self.key, socket.gethostname())
        self.scheduler.tick()
        self.assertEqual(self.cache.get(self.key), socket.gethostname())

    def test_lock_bosy(self):
        self.cache.set(self.key, "otherscheduler")
        self.scheduler.tick()
        self.assertEqual(self.cache.get(self.key), "otherscheduler")
