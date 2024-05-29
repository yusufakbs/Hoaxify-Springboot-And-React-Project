package com.hoaxify.ws.user.repository;


import com.hoaxify.ws.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    User findByActivationToken(String token);

    Page<User> findByIdNot(long id, Pageable page);

    //If projection is used instead of DTO, we need to write a new query method because JpaRepository does not provide this format in the.
    //@Query(value = "Select u from User u")
    //Page<UserProjection> getAllUserRecord(Pageable pageable);
}
