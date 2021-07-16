import sys
from io import StringIO

from django.test import TestCase

from OCloud.celery import debug_task


class DebugTaskTestCase(TestCase):
    def setUp(self):
        self.captured_output = StringIO()
        sys.stdout = self.captured_output

    def tearDown(self):
        sys.stdout = sys.__stdout__

    def test_output(self):
        debug_task()
        self.assertEqual(
            self.captured_output.getvalue(),
            "Request: <Context: {'args': (), 'kwargs': {}}>\n",
        )
