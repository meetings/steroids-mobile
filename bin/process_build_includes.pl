#!/usr/bin/perl

my ( $target, @files ) = @ARGV;

unless ( $target && @files ) {
    warn "Usage: $0 <buildtarget> <file> [file]..\n";
    exit(1);
}

for my $file ( @files ) {
    if ( ! -f $file ) {
        warn "Could not find file: $file\n";
        next;
    }
    my $content = `cat $file`;
    my $in = '';
    my @output = ();
    for my $line ( split /\n/, $content ) {
        if ( ! $in ) {
            my ( $build ) = $line =~ /\<\!\-\-\s*start build include\s*:\s*([^\s]+)/i;
            if ( $build ) {
                $in = $build;
            }
            else {
                push @output, $line;
            }
        }
        else {
            if ( $line =~ /stop build include\s*\-\-\>/i ) {
                $in = '';
            }
            else {
                if ( ! $in || $in eq $target ) {
                    push @output, $line;
                }
            }
        }
    }
    $content =~ s/\n*$//;
    my $new_content = join( "\n", @output );

    if ( $content ne $new_content ) {
        warn "Modifying file for $target: $file\n";
        open F, ">$file" || warn "Could not write to file: $file\n";
        print F $new_content;
        close F;
    }
    else {
        warn "Nothing to change in: $file\n";
    }
}

