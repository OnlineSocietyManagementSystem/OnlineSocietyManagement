package com.society.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.GateEntry;

public interface GateEntryDao extends JpaRepository<GateEntry, Long> {

}
