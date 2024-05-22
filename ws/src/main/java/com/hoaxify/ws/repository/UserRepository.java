package com.hoaxify.ws.repository;


import com.hoaxify.ws.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByActivationToken(String token);

    //If projection is used instead of DTO, we need to write a new query method because JpaRepository does not provide this format in the.
    //@Query(value = "Select u from User u")
    //Page<UserProjection> getAllUserRecord(Pageable pageable);
}
