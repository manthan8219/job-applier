'use server';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_SUPABASE_S3_REGION || "ap-southeast-1",
    endpoint: process.env.NEXT_PUBLIC_SUPABASE_S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY || "",
        secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY || "",
    },
    forcePathStyle: true, // Required for Supabase Storage
});

export async function uploadResumeAction(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) {
            throw new Error("No file provided");
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `resume-${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const bucketName = process.env.SUPABASE_BUCKET_NAME || "resumes";

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
        });

        await s3Client.send(command);

        // Construct the public URL (Assuming 'resumes' bucket is Public)
        // If private, we would need to generate a signed URL, but for now we return the Key/Path.
        // Supabase Public URL pattern: https://<PROJECT_ID>.supabase.co/storage/v1/object/public/<BUCKET>/<KEY>
        // But getting PROJECT_ID from endpoint is messy.
        // Let's return the FileName and a derived URL if possible.

        // We can extract project ID from endpoint: "https://kfthfhbxeqbttptlsikh.storage.supabase.co..."
        // Project ID is "kfthfhbxeqbttptlsikh"
        const projectId = process.env.NEXT_PUBLIC_SUPABASE_S3_ENDPOINT?.split('.')[0].replace('https://', '');
        const publicUrl = `https://${projectId}.supabase.co/storage/v1/object/public/${bucketName}/${fileName}`;

        return { success: true, url: publicUrl, fileName };
    } catch (error: any) {
        console.error("Upload Error:", error);
        return { success: false, error: error.message };
    }
}
