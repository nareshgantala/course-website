# Course Banner Image

Place your course banner image in this directory.

## Recommended Specifications

- **Filename**: `course-banner.png` or `course-banner.jpg`
- **Dimensions**: 1200 x 630 pixels (16:9 aspect ratio)
- **Format**: PNG or JPEG
- **Max file size**: 500KB (optimized for web)

## Usage

The banner image is displayed on the home page hero section.

### Local Serving (Default)
The image is served directly from this folder:
```
/images/course-banner.png
```

### S3 Serving (Production)
For production, you can optionally serve from AWS S3:
1. Upload banner to your S3 bucket
2. Set environment variables:
   ```
   BANNER_SOURCE=s3
   S3_BUCKET_NAME=your-bucket
   S3_BANNER_KEY=images/course-banner.png
   ```
3. The app will generate a pre-signed URL for the image

## Placeholder

If no image is present, the website will display a placeholder with the bootcamp name.

## Tips for a Great Banner

- Include the course name prominently
- Use Atlassian-inspired colors (blue: #0052CC)
- Add relevant icons (Jira, Bitbucket, AWS logos)
- Keep text readable on both desktop and mobile
- Optimize for fast loading
