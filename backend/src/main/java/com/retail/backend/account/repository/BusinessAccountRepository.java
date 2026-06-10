package com.retail.backend.account.repository;

import com.retail.backend.account.entity.BusinessAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessAccountRepository
        extends JpaRepository<BusinessAccount, Long> {
}