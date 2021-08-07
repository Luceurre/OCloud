from unittest import TestCase
from django.core.exceptions import ValidationError

from PublicKey.validators.validate_public_key import validate_public_key


class ValidatePublicKetTest(TestCase):
    def test_it_should_raise_validation_error_when_incorrect_key(self):
        invalid_key = "invalid public key"
        self.assertRaises(ValidationError, validate_public_key, invalid_key)

    def test_it_should_accept_rsa_public_key(self):
        rsa_key = (
            "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQD1xLO9Gsyk/osXMrkRmj+bz4tg"
            "+GkAympMM6c4Nux0Ed4NUpRxACWiLepK7oGLBqzLBvE1iFGsHqh3r6Dl7UkjhNmedix03CJz9TN1dA1ad9W0lD4BEPAOoO2E400kTTPXpOagz52Af+5gdiA18rWRz4jtI3Jm5P68l1NF0UY3iql/AvmWmLHw3dKoDog8Tiss2A+6ANGc8W1ubEl/avu49t7zoU6p8TVqUNhAuuehUJA4hYplAx1MF6ZohltInvmvG54WwRlfUH3Dd62RO20BahlTYucGvnguc/KgeZG+zJpq4x2D04m+1RpazkbOefXYsHkKJXzml5JN5inqP8+R5EDvwP/aoKTx8P+tqO4+m9yVo/ll/lgVVSCNvnp/W6rRLLZ8gaPKGCjXKx2zP9OtrchfMKBnycK9gJPjQGZInQG9fsQXEGAwTSL6yWCiz1Uz6OkbyG04KxcEOxamLbw8xkCtuKy7w5DN++5ITk1yWkUTQ2IM8NZcvMg8Zu5eGJs= pglandon@garudadesktop "
        )
        try:
            validate_public_key(rsa_key)
        except ValidationError:
            self.fail("It should accept RSA public key")

    def test_it_should_raise_validation_error_on_ed_public_key(self):
        ed_key = (
            "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJt4MHyX2mL7ak1b1qNNMwpDLVpm0uuxh2cQ6v8mEZt0 "
            "pglandon@garudadesktop "
        )
        self.assertRaises(ValidationError, validate_public_key, ed_key)
