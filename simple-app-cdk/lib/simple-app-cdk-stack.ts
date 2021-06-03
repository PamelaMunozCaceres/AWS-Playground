
import { App, CfnOutput, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/lib/aws-lambda-nodejs';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/lib/aws-s3';
import * as path from 'path';

// Stack
export class SimpleAppCdkStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // Bucket
    const myBucket = new Bucket(this, 'MyFirstBucket', {
      bucketName: 'test-bucket-simple-app-2021',
      removalPolicy: RemovalPolicy.DESTROY,
      encryption: BucketEncryption.S3_MANAGED
    });

    // Lambda
    const myLambda = new NodejsFunction(this, 'MyFirstLambda', {
      runtime: Runtime.NODEJS_12_X,
      entry: path.join(__dirname, '..', 'api', 'get_photos', 'index.ts'),
      handler: 'getPhotos'
    });

    // Export bucket name
    new CfnOutput(this, 'MyFirstBucketNameExport', {
      value: myBucket.bucketName,
      exportName: 'MyFirstBucketName'
    });
  };
};
