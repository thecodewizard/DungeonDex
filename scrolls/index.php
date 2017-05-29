<!doctype html>
<html lang="en">
<head>
    <!-- General Headers -->
    <title>Mage Scrolls</title>
    <?php require "./../pageparts/header.html" ?>
</head>
<body>

<header>
    <?php include "./../pageparts/navbar.html" ?>
</header>

<main id="scrolls">
    <section class="bg-banner-parent">
        <div class="bg bg-banner">
            <div class="bg bg-banner bg-outliner"></div>
            <img id="mage_scrolls_top"
                 src="about://blank"
                 alt="Find a spell, be a mage"/>
        </div>
        <article class="container">
            <h1>Knowledge is Power</h1>
        </article>
    </section>
    <div id="placeholder" class="container">
        <section id="spell_search">
            <article>
                <h3>Did you have a specific spell in mind?</h3>
                <div class="article-content">
                    <section style="margin: 0;">
                        <h4>Find a Single Spell:</h4>
                        <div id="search_spells" class="customSearchRegion">
                            <form class="form-inline">
                                <div class="form-group">
                                    <label class="sr-only" for="spell_name">Name of the spell</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="spell_name" placeholder="Spellname">
                                        <label class="input-group-addon" role="button" id="spell_name_search">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </label>
                                    </div>
                                </div>
                            </form>
                            <h4 style="margin-left: 15px;">Mages recently inquired about:</h4>
                            <div id="recent_searches"></div>
                        </div>

                        <h4>Or use our Filters:</h4>
                        <div class="onrow">
                            <div class="btn btn-outline btn-info btn-sm" id="btnSearchByFilter">Get All Spells</div>
                            <div class="checkbox-slider--c checkbox-slider-info checkbox-slider-md"
                                 style="margin-left: 15px;"
                                 role="button" data-toggle="collapse" data-target="#spell_filter">
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

                    <section id="spell_filter" class="collapse">
                        <div id="filter_chart_carousel" class="carousel carousel-fade" data-interval="false">
                            <!-- Wrapper -->
                            <div class="carousel-inner">
                                <div id="filter_level_holder" class="item chart_holder active">
                                    <div id="filter_level_chart" class="chart">
                                        <?php include "./../pageparts/loadicon_scrolls.html"; ?>
                                    </div>
                                </div>
                                <div id="filter_school_holder" class="item chart_holder">
                                    <div id="filter_school_chart" class="chart">
                                        <?php include "./../pageparts/loadicon_scrolls.html"; ?>
                                    </div>
                                </div>
                                <div id="filter_class_holder" class="item chart_holder">
                                    <div id="filter_class_chart" class="chart">
                                        <?php include "./../pageparts/loadicon_scrolls.html"; ?>
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
                    <section id="spell_search_result" class="resultarea">
                        <?php include "./../pageparts/loadicon.html"; ?>
                    </section>
                </div>
            </article>
        </section>
        <section id="user_spells" hidden="hidden">
            <div class="sectionheader">
                <div class="bg bg-banner bg-outliner"></div>
                <img src="" alt="mage creature"/>
                <div>
                    <h2>Spell Statistics</h2>
                    <p>Looking for wisdom and power? You've come to the right place.</p>
                </div>
            </div>
            <section>
                <article>
                    <h3>Popular Spells</h3>
                    <div id="popular_spell_holder" class="chart_holder">
                        <div id="popular_spell_chart" class="chart">
                            <?php include "./../pageparts/loadicon_scrolls.html"; ?>
                        </div>
                    </div>
                </article>
            </section>
        </section>
        <section id="sort_school">
            <div class="sectionheader">
                <div class="bg bg-banner bg-outliner"></div>
                <img src="" alt="mage creature"/>
                <div>
                    <h2>Spells by School</h2>
                    <p>Looking for wisdom and power? You've come to the right place.</p>
                </div>
            </div>
            <article class="animo">
                <h3 style="margin-bottom: 0;">Every mage has his type</h3>
                <div class="article-content description">
                    <p>Each school has it's own refined tricks and usages. Find spells based on their use.</p>
                    <p>Click on one of the schools in the graph to request all the spells.</p>
                </div>
                <div id="school_spell_holder" class="chart_holder">
                    <div class="sorter">
                        <button class="btn btn-sm btn-info btn-outline">Top 10</button>
                        <button class="btn btn-sm btn-info btn-outline">Show All</button>
                    </div>
                    <div id="school_spell_chart" class="chart">
                        <?php include "./../pageparts/loadicon_scrolls.html"; ?>
                    </div>
                </div>
                <div class="article-content">
                    <h4>Search Results</h4>
                    <section id="school_spell_result" class="resultarea">
                        <?php include "./../pageparts/loadicon.html"; ?>
                    </section>
                </div>
            </article>
        </section>

        <section id="sort_class">
            <div class="sectionheader">
                <div class="bg bg-banner bg-outliner"></div>
                <img src="" alt="mage creature"/>
                <div>
                    <h2>Spells by Class</h2>
                    <p>Looking for wisdom and power? You've come to the right place.</p>
                </div>
            </div>
            <article class="animo">
                <h3 style="margin-bottom: 0;">Not everyone can use any spell.</h3>
                <div class="article-content description">
                    <p>Each spell has effect on a different field of magic. Not everyone has got the aptitude to wield
                        them all.</p>
                    <p>Click on one of the classes in the graph to request all the spells.</p>
                </div>
                <div id="class_spell_holder" class="chart_holder">
                    <div class="sorter">
                        <button class="btn btn-sm btn-info btn-outline">Top 10</button>
                        <button class="btn btn-sm btn-info btn-outline">Show All</button>
                    </div>
                    <div id="class_spell_chart" class="chart">
                        <?php include "./../pageparts/loadicon_scrolls.html"; ?>                    </div>
                </div>
                <div class="article-content">
                    <h4>Search Results</h4>
                    <section id="class_spell_result" class="resultarea">
                        <?php include "./../pageparts/loadicon.html"; ?>
                    </section>
                </div>
            </article>
        </section>

        <section id="sort_level">
            <div class="sectionheader">
                <div class="bg bg-banner bg-outliner"></div>
                <img src="" alt="mage creature"/>
                <div>
                    <h2>Spells by Level</h2>
                    <p>Looking for wisdom and power? You've come to the right place.</p>
                </div>
            </div>
            <article class="animo">
                <h3 style="margin-bottom: 0;">Take a class: 'Incantations Advanced'. But lets start with the
                    basics.</h3>
                <div class="article-content description">
                    <p>An incantations has to purpose to kill someone for you. But if you aren't able to control what
                        you wield, you might be person who's going to die.</p>
                    <p>Click on one of the Levels in the graph to request all the spells for that level.</p>
                </div>
                <div id="level_spell_holder" class="chart_holder">
                    <div id="level_spell_chart" class="chart">
                        <?php include "./../pageparts/loadicon_scrolls.html"; ?>
                    </div>
                </div>
                <div class="article-content">
                    <h4>Search Results</h4>
                    <section id="level_spell_result" class="resultarea">
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
    window.addEventListener('DOMContentLoaded', function () {
        scrolls.init();
    });
</script>
</body>
</html>