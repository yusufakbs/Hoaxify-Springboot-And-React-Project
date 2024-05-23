//package com.hoaxify.ws.dto;
//
//import org.springframework.beans.factory.annotation.Value;
//
//public interface UserProjection {
//    // Projections are used to improve performance and fetch or query only specific fields.
//    // They are typically used to directly fetch data from the database and are not used for
//    // data transfer purposes like DTOs.
//    long getId();
//    String getUsername();
//    String getEmail();
//    @Value("#{target.image != null ? target.image : 'default.png'}")
//    String getImage();
//
//    @Value("#{target.firstName + ' ' + target.lastName}")
//    String getFullName();
//}
