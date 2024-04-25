package com.chilbaeksan.mokaknyang.group.repository;

import com.chilbaeksan.mokaknyang.group.domain.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    Optional<Group> findByGroupId(Integer groupId);
}
