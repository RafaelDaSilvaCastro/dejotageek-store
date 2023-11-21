package br.com.dejota.dejotaApi.service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Component;

import java.io.*;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Component
public class GoogleDriveService {


    private Drive drive;

    public GoogleDriveService() throws IOException, GeneralSecurityException {
        FileInputStream credentialsFile = new FileInputStream("src/main/resources/credentials.json");

        GoogleCredentials credentials = ServiceAccountCredentials.fromStream(credentialsFile)
                .createScoped(Collections.singleton(DriveScopes.DRIVE));

        this.drive = new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JacksonFactory.getDefaultInstance(),
                new HttpCredentialsAdapter(credentials))
                .setApplicationName("Dejotageek")
                .build();
    }


    public File createFile(String filename, byte[] content) throws IOException {
        File fileMetadata = new File();
        fileMetadata.setName(filename);

        java.io.File tempFile = java.io.File.createTempFile("temp", null);
        FileUtils.writeByteArrayToFile(tempFile, content);

        FileContent mediaContent = new FileContent("application/octet-stream", tempFile);

        File createdFile = drive.files().create(fileMetadata, mediaContent).execute();
        tempFile.delete();

        return createdFile;
    }

    public byte[] getFileContent(String fileId) throws IOException {
        OutputStream outputStream = new ByteArrayOutputStream();
        drive.files().get(fileId).executeMediaAndDownloadTo(outputStream);
        return ((ByteArrayOutputStream) outputStream).toByteArray();
    }

    public void deleteFile(String fileId) throws IOException {
        drive.files().delete(fileId).execute();
    }


}