<!doctype html>
<html lang="en">
<head>
    <!-- General Headers -->
    <title>Armoury</title>
    <?php require "./../pageparts/header.html" ?>
</head>
<body>
<header>
    <?php include "./../pageparts/navbar.html" ?>
</header>

<main id="armoury">
    <section class="bg-banner-parent">
        <div class="bg bg-banner">
            <div class="bg bg-banner bg-outliner"></div>
            <img id="warrior_armoury_top"
                 src=""
                 alt="Embrace The Art Of Killing"/>
        </div>
        <article class="container">
            <h1 id="armoury_title">Embrace The Art Of Killing</h1>
        </article>
    </section>
    <div id="placeholder" class="container">
        <section id="weapon_search">
            <article>
                <h3>Did you have a specific weapon in mind?</h3>
                <div class="article-content">
                    <section style="margin: 0;">
                        <h4>Find a Single Weapon:</h4>
                        <div id="search_weapons" class="customSearchRegion">
                            <form class="form-inline">
                                <div class="form-group">
                                    <label class="sr-only" for="weapon_name">Name of the Weapon</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="weapon_name" placeholder="Name Of Weapon">
                                        <label class="input-group-addon" role="button" id="weapon_name_search">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </label>
                                    </div>
                                </div>
                            </form>
                            <h4 style="margin-left: 15px;">Warriors recently practised with:</h4>
                            <div id="recent_searches"></div>
                        </div>

                        <h4>Or use our Filters:</h4>
                        <div class="onrow">
                            <div class="btn btn-outline btn-info btn-sm" id="btnSearchByFilter">Get All Weapons</div>
                            <div class="checkbox-slider--c checkbox-slider-warning checkbox-slider-md"
                                 style="margin-left: 15px;"
                                 role="button" data-toggle="collapse" data-target="#weapon_filter">
                                <label>
                                    <input type="checkbox"/><span style="margin-left: 15px;">Show Filters</span>
                                    <span id="FilterText"> - (no filter is set)</span>
                                </label>
                            </div>
                            <div id="resetFilters" class="text-info" style="display:none;" role="button"> - Reset
                                Filter
                            </div>
                        </div>
                    </section>

                    <section id="weapon_filter" class="collapse">
                        <div id="filter_chart_carousel" class="carousel carousel-fade" data-interval="false">
                            <!-- Wrapper -->
                            <div class="carousel-inner">
                                <div id="filter_category_holder" class="item chart_holder active">
                                    <div id="filter_category_chart" class="chart">
                                        <?php include "./../pageparts/loadicon_armoury.html"; ?>
                                    </div>
                                </div>
                                <div id="filter_type_holder" class="item chart_holder">
                                    <div id="filter_type_chart" class="chart">
                                        <?php include "./../pageparts/loadicon_armoury.html"; ?>
                                    </div>
                                </div>
                                <div id="filter_size_holder" class="item chart_holder">
                                    <div id="filter_size_chart" class="chart">
                                        <?php include "./../pageparts/loadicon_armoury.html"; ?>
                                    </div>
                                </div>
                            </div>

                            <!-- Controls -->
                            <a class="left carousel-control" href="#filter_chart_carousel" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                            </a>
                            <a class="right carousel-control" href="#filter_chart_carousel" data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right"></span>
                            </a>
                        </div>
                    </section>

                    <h4>Search Results</h4>
                    <section id="weapon_search_result" class="resultarea">
                        <?php include "./../pageparts/loadicon.html"; ?>
                    </section>
                </div>
            </article>
        </section>
        <section id="user_weapons" hidden="hidden">
            <div class="sectionheader">
                <div class="bg bg-banner bg-outliner"></div>
                <img src="" alt="Barbarian Warrior"/>
                <div>
                    <h2>Weapon Statistics</h2>
                    <p>A weapons fame often outlives the warriors.<br/>Yield it with honour.</p>
                </div>
            </div>
            <section>
                <article>
                    <h3>Popular Weapons</h3>
                    <div id="popular_weapon_holder" class="chart_holder">
                        <div id="popular_weapon_chart" class="chart">
                            <?php include "./../pageparts/loadicon_armoury.html"; ?>
                        </div>
                    </div>
                </article>
            </section>
        </section>
        <section id="sort_category">
            <div class="sectionheader">
                <div class="bg bg-banner bg-outliner"></div>
                <img src="" alt="Barbarian Warrior"/>
                <div>
                    <h2>Weapons By Category</h2>
                    <p>A warrior's weapon is an extension to himself.<br/>Choose one wisely.</p>
                </div>
            </div>
            <article class="animo">
                <h3 style="margin-bottom: 0;">Need to be up close? Or rather keep a distance?</h3>
                <div class="article-content description">
                    <p>Each warrior has his own preferred fighting style. Whether you like melee, ranged or more the exotic types, all you need can be found here.</p>
                    <p>Click on one of the categories in the graph to request all the weapons of the chosen category.</p>
                </div>
                <div id="category_weapon_holder" class="chart_holder">
                    <div class="sorter">
                        <button class="btn btn-sm btn-warning btn-outline">Top 5</button>
                        <button class="btn btn-sm btn-warning btn-outline">Show All</button>
                    </div>
                    <div id="category_weapon_chart" class="chart">
                        <?php include "./../pageparts/loadicon_armoury.html"; ?>
                    </div>
                </div>
                <div class="article-content">
                    <h4>Search Results</h4>
                    <section id="category_weapon_result" class="resultarea">
                        <?php include "./../pageparts/loadicon.html"; ?>
                    </section>
                </div>
            </article>
        </section>

        <section id="sort_size">
            <div class="sectionheader">
                <div class="bg bg-banner bg-outliner"></div>
                <img src="" alt="Barbarian Warrior"/>
                <div>
                    <h2>Weapons By Size</h2>
                    <p>Because, yeah, size <span style="text-decoration: underline;">does</span> matter.</p>
                </div>
            </div>
            <article class="animo">
                <h3 style="margin-bottom: 0;">Charge an OwlBear with a dagger. I Dare you. I Double Dare you.</h3>
                <div class="article-content description">
                    <p>Find the most large and brutal weapon there is. But remember, even the mighty caesar was murdered with a dagger in the back.</p>
                    <p>Click on one of the sizes in the graph to request all the weapons of that size.</p>
                </div>
                <div id="size_weapon_holder" class="chart_holder">
                    <div id="size_weapon_chart" class="chart">
                        <?php include "./../pageparts/loadicon_armoury.html"; ?>
                    </div>
                </div>
                <div class="article-content">
                    <h4>Search Results</h4>
                    <section id="size_weapon_result" class="resultarea">
                        <?php include "./../pageparts/loadicon.html"; ?>
                    </section>
                </div>
            </article>
        </section>

        <section id="sort_type">
            <div class="sectionheader">
                <div class="bg bg-banner bg-outliner"></div>
                <img src="" alt="Barbarian Warrior"/>
                <div>
                    <h2>Weapon By Type</h2>
                    <p>Stab. Slash. Splash. Cut. Pierce.<br/>Do whatever pleases you most.</p>
                </div>
            </div>
            <article class="animo">
                <h3 style="margin-bottom: 0;">Hurt your opponents as efficient as possible.</h3>
                <div class="article-content description">
                    <p>You can injure your enemy as much as you like, but your imagination must keep in mind that every
                    creature has its weakness. Would you really try to pierce a mouse and bludgeon a dragon?</p>
                    <p>Click on one of the columns to request the weapons of its type..</p>
                </div>
                <div id="type_weapon_holder" class="chart_holder">
                    <div id="type_weapon_chart" class="chart">
                        <?php include "./../pageparts/loadicon_armoury.html"; ?>
                    </div>
                </div>
                <div class="article-content">
                    <h4>Search Results</h4>
                    <section id="type_weapon_result" class="resultarea">
                        <?php include "./../pageparts/loadicon.html"; ?>
                    </section>
                </div>
            </article>
        </section>
    </div>
</main>

<footer class="footer">
    <?php include "./../pageparts/footer.html" ?>
</footer>
<?php include "./../pageparts/scripts.html" ?>
    <script>
        window.addEventListener('DOMContentLoaded', function(){
            armoury.init();
        });
    </script>
</body>
</html>