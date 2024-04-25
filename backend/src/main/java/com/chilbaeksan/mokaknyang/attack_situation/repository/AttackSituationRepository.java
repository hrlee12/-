package com.chilbaeksan.mokaknyang.attack_situation.repository;

import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttackSituationRepository extends JpaRepository<AttackSituation, Integer> {
}
