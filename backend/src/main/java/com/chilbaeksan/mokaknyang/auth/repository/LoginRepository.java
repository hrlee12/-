package com.chilbaeksan.mokaknyang.auth.repository;

import com.chilbaeksan.mokaknyang.auth.domain.Login;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface LoginRepository extends CrudRepository<Login, String> {
    Optional<Login> findByMemberId(String memberId);
}
