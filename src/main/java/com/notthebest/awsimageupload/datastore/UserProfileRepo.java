package com.notthebest.awsimageupload.datastore;

import com.notthebest.awsimageupload.profile.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserProfileRepo extends JpaRepository<UserProfile, UUID> {

}
