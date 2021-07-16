from django.test import TestCase

from core.models import BaseModel, User


class BaseModelTestCase(TestCase):
    def test_str(self):
        inst = BaseModel()
        self.assertRegexpMatches(str(inst), "^basemodel:[0-9a-f]{6}$")


class UserManagerTestCase(TestCase):
    def create_user(self, is_super=False, **kwargs):
        create_fn = (
            User.objects.create_superuser if is_super else User.objects.create_user
        )
        kwargs.setdefault("email", "me@test.com")
        # This is a test user, this password isn't actually used anywhere.
        kwargs.setdefault("password", "v3rys3cr3t")  # nosec
        return create_fn(**kwargs)

    def test_create_user(self):
        user = self.create_user()
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        user = self.create_user(is_super=True)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

        with self.assertRaises(ValueError):
            self.create_user(is_super=True, is_staff=False)

        with self.assertRaises(ValueError):
            self.create_user(is_super=True, is_superuser=False)

    def test_no_email(self):
        with self.assertRaises(ValueError):
            self.create_user(email="")


class UserTestCase(TestCase):
    def test_save(self):
        user1 = User(email="me@me.me")
        user1.save()
        self.assertEqual(user1.username, user1.email)

        user2 = User(email="me2@me.me", username="haha")
        user2.save()
        self.assertEqual(user2.username, "haha")
