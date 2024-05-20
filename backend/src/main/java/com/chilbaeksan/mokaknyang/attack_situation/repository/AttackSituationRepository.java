package com.chilbaeksan.mokaknyang.attack_situation.repository;

import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttackSituationRepository extends JpaRepository<AttackSituation, Integer> {
    Optional<AttackSituation> findByAttackSituationId(Integer attackSituationId);
}
