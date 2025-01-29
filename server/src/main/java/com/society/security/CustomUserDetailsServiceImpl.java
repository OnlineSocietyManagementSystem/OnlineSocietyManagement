package com.society.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.pojos.Member;
import com.society.daos.MemberDao;

@Service
@Transactional
public class CustomUserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private MemberDao memberDao;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Fetch the Member entity using DAO
        Member member = memberDao.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email not found: " + email));

        // Return a UserDetails implementation for Spring Security
        return new CustomUserDetailsImpl(member);
    }
}
