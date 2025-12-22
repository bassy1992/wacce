"""
Utility functions for the courses app
"""
import boto3
from botocore.client import Config
from django.conf import settings
from urllib.parse import urlparse
import os


def generate_signed_video_url(video_url, expiration=3600):
    """
    Generate a signed URL for DigitalOcean Spaces video
    
    Args:
        video_url: The full URL to the video in DigitalOcean Spaces
        expiration: Time in seconds until the URL expires (default: 1 hour)
    
    Returns:
        Signed URL string or original URL if signing fails
    """
    if not video_url:
        return video_url
    
    try:
        # Get credentials from environment variables
        access_key = os.getenv('DO_SPACES_ACCESS_KEY')
        secret_key = os.getenv('DO_SPACES_SECRET_KEY')
        region = os.getenv('DO_SPACES_REGION', 'sfo3')
        bucket_name = os.getenv('DO_SPACES_BUCKET')
        
        # If credentials are not set, return original URL
        if not all([access_key, secret_key, bucket_name]):
            print("Warning: DigitalOcean Spaces credentials not configured. Returning original URL.")
            return video_url
        
        # Parse the video URL to extract the object key
        parsed_url = urlparse(video_url)
        # Extract the path and remove leading slash
        object_key = parsed_url.path.lstrip('/')
        
        # Create S3 client for DigitalOcean Spaces
        session = boto3.session.Session()
        client = session.client(
            's3',
            region_name=region,
            endpoint_url=f'https://{region}.digitaloceanspaces.com',
            aws_access_key_id=access_key,
            aws_secret_access_key=secret_key,
            config=Config(signature_version='s3v4')
        )
        
        # Generate signed URL
        signed_url = client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': bucket_name,
                'Key': object_key
            },
            ExpiresIn=expiration
        )
        
        return signed_url
        
    except Exception as e:
        print(f"Error generating signed URL: {e}")
        # Return original URL if signing fails
        return video_url
