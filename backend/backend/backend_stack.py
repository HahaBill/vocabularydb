from aws_cdk import (
    # Duration,
    Stack,
    # aws_sqs as sqs,
    aws_dynamodb as dynamodb,
)
from constructs import Construct


class BackendStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # The code that defines your stack goes here

        # example resource
        # queue = sqs.Queue(
        #     self, "BackendQueue",
        #     visibility_timeout=Duration.seconds(300),
        # )

        table = dynamodb.TableV2(
            self,
            "Table",
            partition_key=dynamodb.Attribute(
                name="pk", type=dynamodb.AttributeType.STRING
            ),
            contributor_insights=True,
            table_class=dynamodb.TableClass.STANDARD_INFREQUENT_ACCESS,
            point_in_time_recovery=True,
        )
