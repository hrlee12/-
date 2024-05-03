package com.chilbaeksan.mokaknyang.member.repository;

import com.chilbaeksan.mokaknyang.member.domain.Level;
import com.chilbaeksan.mokaknyang.member.domain.Title;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LevelRepository extends JpaRepository<Level, Short> {

}
