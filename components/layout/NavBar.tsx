'use client'
import { UserButton,  useAuth } from "@clerk/nextjs";
import Conatainer from "../ui/container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import SearchInput from "./SearchInput";
import { ModeToggle } from "../ui/theme-toggle";
import { NavMenu } from "./NavMenu";


const NavBar = () => {
    const Router = useRouter();
    const { userId } = useAuth();

    return ( <div className="sticky top-0 border 
    border-b-primary/10 bg-secondary">
         <Conatainer>
         <div className="flex items-center justify-between">
         <div className="flex items-center gap-1 cursor-pointer " onClick={() => Router.push('/') }>
                <Image src='/logo.svg' alt="hotel-logo" width='45' height="45"/>
                <div className="font-bold-text-xl">Hotel Management</div>
        </div>
        <SearchInput/>
               <div className="flex items-center gap-3 ">
             <div>
                <ModeToggle/>
                <NavMenu/>
             </div>
                <UserButton afterSignOutUrl='/' />
            {!userId && <>
            <Button variant="outline" size="sm" onClick={() => Router.push('/sign-in') } >Sign in</Button>
            <Button size="sm" onClick={() => Router.push('/sign-up') } >Sign up</Button>
            </>}
            </div></div>   
          </Conatainer>
    </div> );
}
 
export default NavBar;