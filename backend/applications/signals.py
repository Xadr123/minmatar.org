import logging

from django.db.models import signals
from django.dispatch import receiver
from esi.clients import EsiClientProvider

from discord.client import DiscordClient
from eveonline.models import EvePrimaryCharacter

from .models import EveCorporationApplication

logger = logging.getLogger(__name__)
discord = DiscordClient()
esi = EsiClientProvider()

APPLICATION_CHANNEL_ID = 1097522187952467989


@receiver(
    signals.post_save,
    sender=EveCorporationApplication,
    dispatch_uid="eve_corporation_application_post_save",
)
def eve_corporation_application_post_save(
    sender, instance, created, **kwargs
):  # noqa # pylint: disable=unused-argument
    """Create a forum thread when an application is created"""
    if instance.discord_thread_id is None:
        user = instance.user
        primary_character = EvePrimaryCharacter.objects.get(
            character__token__user=user
        )
        message = ""
        message += f"<@{user.discord_user.id}>"
        message += "\n\n"
        message += (
            f"Main Character: {primary_character.character.character_name}\n"
        )
        message += f"Applying to: {instance.corporation.name}\n"
        message += f"Description: {instance.description}\n"
        application_url = f"https://my.minmatar.org/alliance/corporations/application/{instance.corporation.corporation_id}/{instance.id}"
        message += f"{application_url}\n"
        response = discord.create_forum_thread(
            channel_id=APPLICATION_CHANNEL_ID,
            title=f"{primary_character.character.character_name} - {instance.corporation.name}",
            message=message,
        )
        instance.discord_thread_id = int(response.json()["id"])
        instance.save()

    if instance.status == "accepted":
        message = ":tada: Your application has been accepted!\n- Apply in-game \n- Follow these [onboarding steps](https://wiki.minmatar.org/en/alliance/Onboarding)\n- Familiarize yourself with our [guides, values, and more](https://wiki.minmatar.org/)"
        discord.create_message(
            channel_id=instance.discord_thread_id, message=message
        )
        discord.close_thread(channel_id=instance.discord_thread_id)

    if instance.status == "rejected":
        message = ":bangbang: Your application has been rejected, please contact your recruiter for more information"
        discord.create_message(
            channel_id=instance.discord_thread_id, message=message
        )
        discord.close_thread(channel_id=instance.discord_thread_id)
