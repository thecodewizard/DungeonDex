<!doctype html>
<html lang="en">
<head>
    <!-- General Headers -->
    <title>Mage Scrolls</title>
    <?php require "./../pageparts/header.html" ?>
</head>
<body class="cutoff">
<header>
    <?php include "./../pageparts/navbar.html" ?>
</header>

<main>
    <section class="bg-banner-parent">
        <div class="bg bg-banner">
            <div class="bg bg-banner bg-outliner"></div>
            <img id="arena_top"
                 src="./../assets/backgrounds/shared/deathless.jpg"
                 alt="Cast your Vote at the Arena"/>
        </div>
        <article class="container">
            <h1>Cast your vote in the Arena</h1>
        </article>
    </section>
    <div id="placeholder" class="container">
        <section id="active_fights">
            <article id="loading"></article>
            <article class="fight" id="fight_0" data-template="template" style="display: none;">
                <div id="chart_fight_" class="blur">

                </div>
                <article>
                    <div>
                        <div class="heroimgholder">
                            <img src="./../assets/Characters/orc.png" alt="orc" />
                        </div>
                        <div class="typeholder hhero">
                            <h3>Orc Fighter</h3>
                            <div>
                                <p>Left Hand: <span data-yield="left">Javelin</span></p>
                                <p>Right Hand: <span data-yield="right">FireBall</span></p>
                            </div>
                        </div>
                        <div class="strategy">
                            <h3 style="text-align: center; width: 100%;">Fight Strategy</h3>
                            <p>
                                I'd just charge up and throw this fucker of the cliff.
                            </p>
                        </div>
                        <div class="btnholder">
                            <div data-btn="btn" class="btn btn-success btn-lg btn-outline">Vote for the hero</div>
                        </div>
                    </div>
                    <div class="reverse">
                        <div class="monsterimgholder">
                            <img src="<?php require "./../pageparts/random_monster_imgsrc.php"; ?>" alt="monster" />
                        </div>
                        <div class="typeholder mmonster">
                            <h3>Dragon Turtle</h3>
                            <div>
                                <p>Challenge Level: <em>12</em></p>
                            </div>
                        </div>
                        <div class="typeholder mmonsterinfo">
                            <p>Type: Fire</p>
                            <p>Size: Huge</p>
                        </div>
                        <div class="btnholder">
                            <div data-btn="btn" class="btn btn-danger btn-lg btn-outline">Vote for the monster</div>
                        </div>
                    </div>
                </article>
            </article>
        </section>
        <section id="past_fights">

        </section>
    </div>
</main>

<footer class="footer">
    <?php include "./../pageparts/footer.html" ?>
</footer>
<?php include "./../pageparts/scripts.html" ?>
    <script>
        window.addEventListener('DOMContentLoaded', function(){
            arena.init();
        });
    </script>

</body>
</html>