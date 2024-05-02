package com.chilbaeksan.mokaknyang.member.repository;

import com.chilbaeksan.mokaknyang.member.domain.Cat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CatRepository extends JpaRepository<Cat, Integer> {
    Optional<Cat> findByCatId(Integer catId);
}
