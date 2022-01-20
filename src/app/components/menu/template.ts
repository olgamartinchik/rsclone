export default function menuTemplate(): string {
  return `
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper">
                <a href="#" class="brand-logo">
                    <img src="./assets/img/logo.png" alt="FitOn" />
                </a>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger">
                    <i class="material-icons">menu</i>
                </a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li class="active">
                        <a href="#">
                            <span><i class="icon user"></i></span>
                            For you
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span><i class="icon browse"></i></span>
                            Browse
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span><i class="icon meal"></i></span>
                            Meals
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span><i class="icon settings"></i></span>
                            Settings
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <div class="icon-container">
                                <span class="profile">O</span>
                            </div>
                            Profile
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <ul class="sidenav" id="mobile-demo">
        <li><a href="#">For you</a></li>
        <li><a href="#">Browse</a></li>
        <li><a href="#">Meals</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Profile</a></li>
    </ul>
  `;
}

