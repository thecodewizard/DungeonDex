<!doctype html>
<html lang="en">
<head>
    <!-- General Headers -->
    <title>Monster Cave</title>
    <?php require "./../pageparts/header.html" ?>
</head>
<body>
<header>
    <?php include "./../pageparts/navbar.html" ?>
</header>

<main>
    <section class="bg-banner-parent">
        <div class="bg bg-banner">
            <div class="bg bg-banner bg-outliner"></div>
            <img id="monster_cave_top"
                 src="./../assets/backgrounds/shared/DnD_MM_Art.jpg"
                 alt="Prepare For The Worst"/>
        </div>
        <article class="container">
            <h1>Prepare for The Worst</h1>
        </article>
    </section>
    <div id="placeholder" class="container">
        <section id="monster_search">
            <article>
                <h3>Is there a specific abomination you are thinking of?</h3>
                <div class="article-content">
                    <section style="margin: 0;">
                        <h4>Find a Specific Monster:</h4>
                        <div id="search_monsters" class="customSearchRegion">
                            <form class="form-inline">
                                <div class="form-group">
                                    <label class="sr-only" for="monster_name">Monster Name</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="monster_name" placeholder="Monster Name">
                                        <label class="input-group-addon" role="button" id="monster_name_search">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </label>
                                    </div>
                                </div>
                            </form>
                            <h4 style="margin-left: 15px;">Recently Spotted Monsters:</h4>
                            <div id="recent_searches"></div>
                        </div>

                        <h4>Or use our Filters:</h4>
                        <div class="onrow">
                            <div class="btn btn-outline btn-danger btn-sm" id="btnSearchByFilter">Get All Monsters</div>
                            <div class="checkbox-slider--c checkbox-slider-danger checkbox-slider-md"
                                 style="margin-left: 15px;"
                                 role="button" data-toggle="collapse" data-target="#monster_filter">
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

                    <section id="monster_filter" class="collapse">
                        <div id="filter_chart_carousel" class="carousel carousel-fade" data-interval="false">
                            <!-- Wrapper -->
                            <div class="carousel-inner">
                                <div id="filter_challenge_holder" class="item chart_holder active">
                                    <div id="filter_challenge_chart" class="chart">
                                        <?php include "./../pageparts/loadicon_cave.html"; ?>
                                    </div>
                                </div>
                                <div id="filter_size_holder" class="item chart_holder">
                                    <div id="filter_size_chart" class="chart">
                                        <?php include "./../pageparts/loadicon_cave.html"; ?>
                                    </div>
                                </div>
                                <div id="filter_type_holder" class="item chart_holder">
                                    <div id="filter_type_chart" class="chart">
                                        <?php include "./../pageparts/loadicon_cave.html"; ?>
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
                    <section id="monster_search_result" class="resultarea">
                        <?php include "./../pageparts/loadicon.html"; ?>
                    </section>
                </div>
            </article>
        </section>
        <section id="user_monsters" hidden="hidden">
            <div class="sectionheader">
                <div class="bg bg-banner bg-outliner"></div>
                <img src="" alt="Evil Elf"/>
                <div>
                    <h2>Monster Statistics</h2>
                    <p>Earning Eternal Fame by Slaying mighty Enemies?<br/>Here is the place to look for them.</p>
                </div>
            </div>
            <section>
                <article>
                    <h3>Common Monsters</h3>
                    <div id="popular_monster_holder" class="chart_holder">
                        <div id="popular_monster_chart" class="chart">
                            <?php include "./../pageparts/loadicon_cave.html"; ?>
                        </div>
                    </div>
                </article>
            </section>
        </section>
        <section id="sort_challenge">
            <div class="sectionheader">
                <div class="bg bg-banner bg-outliner"></div>
                <img src="" alt="Evil Elf"/>
                <div>
                    <h2>Monsters By Challenge Rating</h2>
                    <p>Looking for the Toughest? Or just making sure to stay away from them?</p>
                </div>
            </div>
            <article class="animo">
                <h3 style="margin-bottom: 0;">A Different Monster. A Different Challenge</h3>
                <div class="article-content description">
                    <p>Each monster is harder to defeat than the other. Be sure you can defeat who you face, or you might not be around to warn others about it.</p>
                    <p>Click on one of the Ranges in the graph to see the monsters in that Challenge Range.</p>
                </div>
                <div id="challenge_monster_holder" class="chart_holder">
                    <div id="challenge_monster_chart" class="chart">
                        <?php include "./../pageparts/loadicon_cave.html"; ?>
                    </div>
                </div>
                <div class="article-content">
                    <h4>Search Results</h4>
                    <section id="challenge_monster_result" class="resultarea">
                        <?php include "./../pageparts/loadicon.html"; ?>
                    </section>
                </div>
            </article>
        </section>

        <section id="sort_size">
            <div class="sectionheader">
                <div class="bg bg-banner bg-outliner"></div>
                <img src="" alt="Evil Elf"/>
                <div>
                    <h2>Monsters By Size</h2>
                    <p>Going for the Collosals? Or rather slay an Imp?</p>
                </div>
            </div>
            <article class="animo">
                <h3 style="margin-bottom: 0;">Pick on monsters of your own size</h3>
                <div class="article-content description">
                    <p>A Bigger monster generally poses a bigger challenge. But keep aware for the little ones. They Bite.</p>
                    <p>Click on one of the sizes in the graph to request all the monsters of that size.</p>
                </div>
                <div id="size_monster_holder" class="chart_holder">
                    <div id="size_monster_chart" class="chart">
                        <?php include "./../pageparts/loadicon_cave.html"; ?>
                    </div>
                </div>
                <div class="article-content">
                    <h4>Search Results</h4>
                    <section id="size_monster_result" class="resultarea">
                        <?php include "./../pageparts/loadicon.html"; ?>
                    </section>
                </div>
            </article>
        </section>

        <section id="sort_type">
            <div class="sectionheader">
                <div class="bg bg-banner bg-outliner"></div>
                <img src="" alt="Evil Elf"/>
                <div>
                    <h2>Monsters By Type</h2>
                    <p>Don't worry. Most of them don't breath fire.</p>
                </div>
            </div>
            <article class="animo">
                <h3 style="margin-bottom: 0;">Might be a solid plan to consult these graphs before charging on an Ice Giant with the 'ray of frost' spell...</h3>
                <div class="article-content description">
                    <p>Each Creatures has its type. And that type is closely related to it's weaknesses and proficiencies. <br/>
                    Be sure to pick up some knowledge before rushing to the monster to slay it.</p>
                    <p>Click on one of the Types in the graph to request all the monsters that fall under that type.</p>
                </div>
                <div id="type_monster_holder" class="chart_holder">
                    <div class="sorter">
                        <button class="btn btn-sm btn-danger btn-outline">Top 10</button>
                        <button class="btn btn-sm btn-danger btn-outline">Show All</button>
                    </div>
                    <div id="type_monster_chart" class="chart">
                        <?php include "./../pageparts/loadicon_cave.html"; ?>
                    </div>
                </div>
                <div class="article-content">
                    <h4>Search Results</h4>
                    <section id="type_monster_result" class="resultarea">
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
            cave.init();
        });
    </script>
</body>
</html>