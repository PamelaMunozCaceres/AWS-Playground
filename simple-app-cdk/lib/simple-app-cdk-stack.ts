import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { RemovalPolicy } from '@aws-cdk/core';

// Stack
export class SimpleAppCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // Bucket
    const myBucket = new Bucket(this, 'MyFirstBucket', {
      bucketName: 'test-bucket-simple-app-2021',
      removalPolicy: RemovalPolicy.DESTROY,
      encryption: BucketEncryption.S3_MANAGED
    });

    // Export bucket name
    new cdk.CfnOutput(this, 'MyFirstBucketNameExport', {
      value: myBucket.bucketName,
      exportName: 'MyFirstBucketName'
    });
  };
};
