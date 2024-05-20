package com.chilbaeksan.mokaknyang.attack.repository;

import com.chilbaeksan.mokaknyang.attack.domain.Attack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttackRepository extends JpaRepository<Attack, Integer> {
}
