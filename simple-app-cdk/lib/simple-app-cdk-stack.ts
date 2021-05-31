import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs'
import { RemovalPolicy } from '@aws-cdk/core';
import { Runtime } from '@aws-cdk/aws-lambda';
import * as path from 'path';

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

    // Lambda
    const myLambda = new lambda.NodejsFunction(this, 'MyFirstLambda', {
      runtime: Runtime.NODEJS_12_X,
      entry: path.join(__dirname, '..', 'api', 'get_photos', 'index.ts'),
      handler: 'getPhotos'
    });

    // Export bucket name
    new cdk.CfnOutput(this, 'MyFirstBucketNameExport', {
      value: myBucket.bucketName,
      exportName: 'MyFirstBucketName'
    });
  };
};
