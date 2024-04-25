package com.chilbaeksan.mokaknyang.auth.repository;

import com.chilbaeksan.mokaknyang.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepository extends JpaRepository<Member, Integer> {

}
