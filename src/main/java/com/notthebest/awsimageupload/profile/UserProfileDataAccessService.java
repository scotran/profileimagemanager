package com.notthebest.awsimageupload.profile;

import com.notthebest.awsimageupload.datastore.UserProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class UserProfileDataAccessService {

    private final UserProfileRepo userProfileRepo;

    @Autowired
    public UserProfileDataAccessService(UserProfileRepo userProfileRepo) {
        this.userProfileRepo = userProfileRepo;
    }

    public List<UserProfile> getUserProfiles() {
        return userProfileRepo.findAll();
    }

    public void saveUserProfile(UserProfile userProfile) {
        userProfileRepo.save(userProfile);
    }

    public Optional<UserProfile> findUserProfile(UUID userProfileId) {
        return userProfileRepo.findById(userProfileId);
    }
}
